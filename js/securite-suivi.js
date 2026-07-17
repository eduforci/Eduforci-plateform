// ============================================================
// Suivi de sécurité : journal d'audit, sessions & appareils
// ------------------------------------------------------------
// Utilitaire partagé pour :
//  - enregistrer une action dans le journal d'audit (immuable)
//  - enregistrer une connexion / déconnexion
//  - tenir à jour l'historique des appareils utilisés
//  - vérifier si un admin a forcé la déconnexion à distance
//
// Toutes les pages qui l'utilisent doivent importer depuis
// "./js/securite-suivi.js".
// ============================================================

import {
    doc, getDoc, setDoc, addDoc, updateDoc, collection,
    serverTimestamp, increment
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// ---------- Détection simple de l'appareil ----------

export function detecterAppareil() {
    const ua = navigator.userAgent || "";
    let type = "Autre";
    if (/android/i.test(ua)) type = "Android";
    else if (/iphone|ipad|ipod/i.test(ua)) type = "iPhone / iPad";
    else if (/windows/i.test(ua)) type = "Windows";
    else if (/macintosh|mac os/i.test(ua)) type = "Mac";
    else if (/linux/i.test(ua)) type = "Linux";

    let navigateur = "Autre";
    if (/edg\//i.test(ua)) navigateur = "Edge";
    else if (/chrome|crios/i.test(ua)) navigateur = "Chrome";
    else if (/firefox|fxios/i.test(ua)) navigateur = "Firefox";
    else if (/safari/i.test(ua)) navigateur = "Safari";

    return { type, navigateur };
}

// ---------- Journal d'audit (immuable) ----------
// categorie : "connexion" | "compte" | "enseignant" | "parent" | "admin"

export async function enregistrerAudit(db, { uid, role, identifiant, nom, action, categorie, details }) {
    try {
        await addDoc(collection(db, "journalAudit"), {
            uid: uid || null,
            role: role || "inconnu",
            identifiant: identifiant || null,
            nom: nom || null,
            action,
            categorie: categorie || "autre",
            details: details || "",
            appareil: detecterAppareil(),
            date: serverTimestamp()
        });
    } catch (error) {
        // Le journal ne doit jamais faire planter une action utilisateur.
        console.warn("Journal d'audit indisponible :", error.message);
    }
}

// ---------- Sessions actives / historique des appareils ----------
// Un document par couple (utilisateur, type d'appareil).

function idSession(uid, typeAppareil) {
    return `${uid}_${typeAppareil.replace(/[^a-zA-Z0-9]/g, "")}`;
}

export async function enregistrerConnexion(db, { uid, role, identifiant, nom }) {
    const { type, navigateur } = detecterAppareil();
    const ref = doc(db, "sessionsActives", idSession(uid, type));

    try {
        const snap = await getDoc(ref);

        if (snap.exists()) {
            await updateDoc(ref, {
                uid, role, identifiant: identifiant || null, nom: nom || null,
                appareil: type,
                navigateur,
                derniereConnexion: serverTimestamp(),
                nombreConnexions: increment(1),
                actif: true,
                forceDeconnexion: false
            });
        } else {
            await setDoc(ref, {
                uid, role, identifiant: identifiant || null, nom: nom || null,
                appareil: type,
                navigateur,
                premiereConnexion: serverTimestamp(),
                derniereConnexion: serverTimestamp(),
                nombreConnexions: 1,
                actif: true,
                forceDeconnexion: false
            });
        }
    } catch (error) {
        console.warn("Suivi de session indisponible :", error.message);
    }

    try {
        await enregistrerAudit(db, {
            uid, role, identifiant, nom,
            action: "Connexion réussie",
            categorie: "connexion"
        });
    } catch (error) {
        console.warn("Journal d'audit (connexion) indisponible :", error.message);
    }
}

export async function enregistrerDeconnexion(db, { uid, role, identifiant, nom }) {
    const { type } = detecterAppareil();
    try {
        await updateDoc(doc(db, "sessionsActives", idSession(uid, type)), {
            actif: false,
            derniereActivite: serverTimestamp()
        });
    } catch (error) {
        console.warn("Suivi de session indisponible :", error.message);
    }

    await enregistrerAudit(db, {
        uid, role, identifiant, nom,
        action: "Déconnexion",
        categorie: "connexion"
    });
}

// Vérifie si un admin a demandé la déconnexion à distance de cet appareil.
// À appeler au chargement des pages du tableau de bord.
export async function verifierDeconnexionForcee(db, uid) {
    const { type } = detecterAppareil();
    try {
        const snap = await getDoc(doc(db, "sessionsActives", idSession(uid, type)));
        return snap.exists() && snap.data().forceDeconnexion === true;
    } catch (error) {
        return false;
    }
                }
