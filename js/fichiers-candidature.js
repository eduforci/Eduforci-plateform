// EDUFORCI — stockage des documents de candidature dans Firestore (gratuit, sans Firebase Storage)
// Chaque fichier est découpé en morceaux (texte base64) enregistrés dans la collection "fichiersCandidatures".
import { doc, getDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

export const COLLECTION_FICHIERS = "fichiersCandidatures";
const TAILLE_MORCEAU = 400000; // caractères base64 par morceau (multiple de 4, bien sous la limite de 1 Mo)

function idMorceau(uid, cle, version, i) {
    return uid + "_" + cle + "_" + version + "_" + i;
}

function blobVersBase64(blob) {
    return new Promise((resolve, reject) => {
        const lecteur = new FileReader();
        lecteur.onload = () => {
            const texte = String(lecteur.result || "");
            const pos = texte.indexOf(",");
            resolve(pos >= 0 ? texte.slice(pos + 1) : texte);
        };
        lecteur.onerror = () => reject(new Error("lecture du fichier impossible"));
        lecteur.readAsDataURL(blob);
    });
}

function avecDelai(promesse, ms, message) {
    let minuteur;
    const delai = new Promise((_, rejeter) => {
        minuteur = setTimeout(() => { const e = new Error(message); e.utilisateur = true; rejeter(e); }, ms);
    });
    return Promise.race([promesse, delai]).finally(() => clearTimeout(minuteur));
}

// Envoie un fichier. Renvoie les informations à garder dans le dossier (documents[cle]).
export async function ecrireFichier(db, uid, cle, blob, nom, type, surProgres) {
    const base64 = await blobVersBase64(blob);
    const total = Math.max(1, Math.ceil(base64.length / TAILLE_MORCEAU));
    const version = Date.now();

    for (let i = 0; i < total; i++) {
        const donnees = base64.slice(i * TAILLE_MORCEAU, (i + 1) * TAILLE_MORCEAU);
        let tentative = 0;
        for (;;) {
            try {
                await avecDelai(
                    setDoc(doc(db, COLLECTION_FICHIERS, idMorceau(uid, cle, version, i)), {
                        uid, cle, version, ordre: i, total, data: donnees
                    }),
                    45000,
                    "Aucune réponse du serveur en 45 secondes. Vérifiez votre connexion puis réessayez."
                );
                break;
            } catch (err) {
                tentative++;
                if (tentative >= 3) throw err;
            }
        }
        if (surProgres) surProgres(Math.round(((i + 1) / total) * 100));
    }

    return { stockage: "firestore", nom, type, taille: blob.size, parties: total, version };
}

// Supprime les morceaux d'un ancien fichier (sans bloquer si ça échoue)
export async function supprimerFichier(db, uid, cle, info) {
    if (!info || info.stockage !== "firestore") return;
    for (let i = 0; i < (info.parties || 0); i++) {
        try { await deleteDoc(doc(db, COLLECTION_FICHIERS, idMorceau(uid, cle, info.version, i))); } catch (err) {}
    }
}

// Relit un fichier et renvoie un Blob
export async function lireFichier(db, uid, cle, info) {
    const lots = await Promise.all(
        Array.from({ length: info.parties }, (_, i) => getDoc(doc(db, COLLECTION_FICHIERS, idMorceau(uid, cle, info.version, i))))
    );
    const morceaux = [];
    lots.forEach((snap, i) => {
        if (!snap.exists()) throw new Error("morceau " + (i + 1) + " introuvable");
        const binaire = atob(snap.data().data);
        const octets = new Uint8Array(binaire.length);
        for (let k = 0; k < binaire.length; k++) octets[k] = binaire.charCodeAt(k);
        morceaux.push(octets);
    });
    return new Blob(morceaux, { type: info.type || "application/octet-stream" });
}

// Petite image (96 px) pour les listes
export async function creerMiniature(blob) {
    try {
        const url = URL.createObjectURL(blob);
        const img = await new Promise((resolve, reject) => {
            const i = new Image();
            i.onload = () => resolve(i);
            i.onerror = () => reject(new Error("image illisible"));
            i.src = url;
        });
        URL.revokeObjectURL(url);
        const cote = 96;
        const echelle = Math.max(cote / img.naturalWidth, cote / img.naturalHeight);
        const w = img.naturalWidth * echelle, h = img.naturalHeight * echelle;
        const canvas = document.createElement("canvas");
        canvas.width = cote; canvas.height = cote;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cote, cote);
        ctx.drawImage(img, (cote - w) / 2, (cote - h) / 2, w, h);
        return canvas.toDataURL("image/jpeg", 0.7);
    } catch (err) {
        return "";
    }
}

// Ouvre un fichier stocké dans un nouvel onglet (ou le télécharge si le navigateur bloque l'ouverture)
export async function ouvrirFichier(db, uid, cle, info) {
    const fenetre = window.open("", "_blank");
    try {
        const blob = await lireFichier(db, uid, cle, info);
        const url = URL.createObjectURL(blob);
        if (fenetre) { fenetre.location.href = url; }
        else {
            const a = document.createElement("a");
            a.href = url; a.download = info.nom || cle; document.body.appendChild(a); a.click(); a.remove();
        }
        setTimeout(() => URL.revokeObjectURL(url), 120000);
    } catch (err) {
        if (fenetre) fenetre.close();
        throw err;
    }
}
