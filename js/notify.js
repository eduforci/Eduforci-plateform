/*
 * EDUFORCI — Notifications modernes
 * Remplace les popups natifs alert() du navigateur par de vraies
 * fenêtres et notifications modernes (SweetAlert2 + toasts), sans
 * bloquer la page.
 *
 * Ce fichier redéfinit window.alert : aucune autre ligne de code du
 * site n'a besoin d'être modifiée pour en profiter.
 */
(function () {

    if (window.__eduforciNotifyReady) return;
    window.__eduforciNotifyReady = true;

    const STYLE_ID = "eduforci-notify-style";
    const CONTAINER_ID = "eduforci-notify-container";

    // On charge SweetAlert2 (bibliothèque professionnelle de pop-ups)
    // en tâche de fond dès l'arrivée sur la page.
    let sweetAlertPret = false;
    const filesAttente = [];

    function chargerSweetAlert() {
        if (document.getElementById("eduforci-sweetalert2")) return;
        const script = document.createElement("script");
        script.id = "eduforci-sweetalert2";
        script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        script.onload = function () {
            sweetAlertPret = true;
            personnaliserSweetAlert();
            filesAttente.forEach(fn => fn());
            filesAttente.length = 0;
        };
        script.onerror = function () {
            // Si la bibliothèque ne charge pas (pas de connexion, bloqué, etc.)
            // on continue avec les notifications "toast" internes, qui elles
            // ne dépendent d'aucun service externe.
            sweetAlertPret = false;
        };
        document.head.appendChild(script);
    }

    function personnaliserSweetAlert() {
        if (!window.Swal || document.getElementById(STYLE_ID)) return;
        const style = document.createElement("style");
        style.id = STYLE_ID + "-swal";
        style.textContent = `
.swal2-popup{
    font-family:'Poppins',sans-serif !important;
    border-radius:20px !important;
}
.swal2-title{
    color:#153A73 !important;
    font-weight:700 !important;
}
.swal2-confirm{
    background:#0B63F6 !important;
    border-radius:10px !important;
    box-shadow:none !important;
    font-weight:600 !important;
    padding:10px 26px !important;
}
`;
        document.head.appendChild(style);
    }

    chargerSweetAlert();

    function injecterStylesToast() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = `
#${CONTAINER_ID}{
    position:fixed;
    top:20px;
    right:20px;
    z-index:999999;
    display:flex;
    flex-direction:column;
    gap:12px;
    width:min(380px,calc(100vw - 40px));
    max-width:min(380px,calc(100vw - 40px));
    font-family:'Poppins',sans-serif;
}
@media (max-width:480px){
    #${CONTAINER_ID}{
        top:14px;
        right:14px;
        left:14px;
        width:auto;
        max-width:none;
    }
}
.eduforci-toast{
    display:flex;
    align-items:flex-start;
    gap:12px;
    background:#ffffff;
    color:#1c2b3a;
    border-radius:14px;
    padding:16px 18px;
    box-shadow:0 12px 30px rgba(5,32,78,.22);
    border-left:6px solid #0B63F6;
    opacity:0;
    transform:translateX(40px);
    animation:eduforciToastIn .35s ease forwards;
    pointer-events:auto;
    width:100%;
    box-sizing:border-box;
}
.eduforci-toast.sortie{
    animation:eduforciToastOut .3s ease forwards;
}
@keyframes eduforciToastIn{
    to{opacity:1;transform:translateX(0);}
}
@keyframes eduforciToastOut{
    to{opacity:0;transform:translateX(40px);}
}
.eduforci-toast .icone{
    flex-shrink:0;
    width:26px;
    height:26px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:15px;
    color:#fff;
    margin-top:1px;
}
.eduforci-toast .texte{
    flex:1 !important;
    width:100% !important;
    max-width:100% !important;
    min-width:200px !important;
    display:block !important;
    white-space:normal !important;
    word-break:normal !important;
    overflow-wrap:break-word !important;
}
.eduforci-toast .fermer{
    background:none;
    border:none;
    cursor:pointer;
    color:#9aa5b1;
    font-size:16px;
    line-height:1;
    padding:2px;
    flex-shrink:0;
}
.eduforci-toast .fermer:hover{
    color:#1c2b3a;
}
.eduforci-toast.succes{border-left-color:#28a745;}
.eduforci-toast.succes .icone{background:#28a745;}
.eduforci-toast.erreur{border-left-color:#d93025;}
.eduforci-toast.erreur .icone{background:#d93025;}
.eduforci-toast.avertissement{border-left-color:#e08b00;}
.eduforci-toast.avertissement .icone{background:#e08b00;}
.eduforci-toast.info{border-left-color:#0B63F6;}
.eduforci-toast.info .icone{background:#0B63F6;}

.eduforci-loading-overlay{
    position:fixed;
    inset:0;
    background:rgba(5,32,78,.55);
    backdrop-filter:blur(2px);
    z-index:9999999;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:16px;
    font-family:'Poppins',sans-serif;
    opacity:0;
    animation:eduforciFadeIn .25s ease forwards;
}
@keyframes eduforciFadeIn{ to{opacity:1;} }
.eduforci-spinner{
    width:52px;
    height:52px;
    border-radius:50%;
    border:5px solid rgba(255,255,255,.35);
    border-top-color:#ffffff;
    animation:eduforciSpin .8s linear infinite;
}
@keyframes eduforciSpin{ to{transform:rotate(360deg);} }
.eduforci-loading-texte{
    color:#fff;
    font-weight:600;
    font-size:15px;
}
`;
        document.head.appendChild(style);
    }

    function obtenirConteneur() {
        injecterStylesToast();
        let conteneur = document.getElementById(CONTAINER_ID);
        if (!conteneur) {
            conteneur = document.createElement("div");
            conteneur.id = CONTAINER_ID;
            document.body.appendChild(conteneur);
        }
        return conteneur;
    }

    // Rend certains messages techniques (erreurs Firebase) compréhensibles.
    function traduireMessage(message) {
        const texte = String(message);
        const correspondances = [
            [/auth\/network-request-failed/i, "Connexion impossible : vérifiez votre connexion internet et réessayez."],
            [/auth\/invalid-credential|auth\/wrong-password/i, "E-mail ou mot de passe incorrect."],
            [/auth\/user-not-found/i, "Aucun compte trouvé avec cet e-mail."],
            [/auth\/email-already-in-use/i, "Un compte existe déjà avec cette adresse e-mail."],
            [/auth\/weak-password/i, "Le mot de passe doit contenir au moins 6 caractères."],
            [/auth\/invalid-email/i, "Cette adresse e-mail n'est pas valide."],
            [/auth\/too-many-requests/i, "Trop de tentatives. Merci de réessayer dans quelques minutes."],
            [/auth\/user-disabled/i, "Ce compte a été désactivé."]
        ];
        for (const [motif, remplacement] of correspondances) {
            if (motif.test(texte)) return remplacement;
        }
        // Nettoie les messages bruts type "Firebase: Error (auth/xxx)." si non reconnus
        return texte.replace(/^Firebase:\s*/i, "").replace(/\s*\(auth\/[a-z-]+\)\.?/i, "");
    }

    // Détecte automatiquement le type de notification à partir du message,
    // pour que chaque ancien appel alert("...") garde un rendu cohérent
    // (succès en vert, erreur en rouge, avertissement en orange, info en bleu).
    function detecterType(message) {
        const texte = String(message).toLowerCase();

        const motsErreur = ["erreur", "refusé", "échec", "échoué", "auth/", "invalide", "incorrect", "impossible"];
        const motsSucces = ["succès", "réussi", "créé avec", "envoyée", "publié", "publiée", "changé avec", "mises à jour", "enregistrés"];
        const motsAvertissement = ["merci de", "veuillez", "obligatoire", "ne correspondent pas", "au moins", "aucun", "avant de"];

        if (motsErreur.some(m => texte.includes(m))) return "erreur";
        if (motsSucces.some(m => texte.includes(m))) return "succes";
        if (motsAvertissement.some(m => texte.includes(m))) return "avertissement";
        return "info";
    }

    const ICONES = {
        succes: "✓",
        erreur: "✕",
        avertissement: "!",
        info: "i"
    };

    const TITRES = {
        succes: "Succès",
        erreur: "Oups !",
        avertissement: "Attention",
        info: "Information"
    };

    const ICONES_SWAL = {
        succes: "success",
        erreur: "error",
        avertissement: "warning",
        info: "info"
    };

    const DUREE_AFFICHAGE = {
        succes: 4500,
        info: 4500,
        avertissement: 5500,
        erreur: 6500
    };

    function afficherToast(message, typeFinal) {
        const conteneur = obtenirConteneur();

        const toast = document.createElement("div");
        toast.className = `eduforci-toast ${typeFinal}`;
        toast.innerHTML = `
            <div class="icone">${ICONES[typeFinal] || ICONES.info}</div>
            <div class="texte"></div>
            <button class="fermer" aria-label="Fermer">✕</button>
        `;
        toast.querySelector(".texte").textContent = message;

        function retirer() {
            toast.classList.add("sortie");
            setTimeout(() => toast.remove(), 300);
        }

        toast.querySelector(".fermer").addEventListener("click", retirer);
        conteneur.appendChild(toast);

        const duree = DUREE_AFFICHAGE[typeFinal] || 4500;
        setTimeout(retirer, duree);
    }

    function afficherPopup(message, typeFinal) {
        return window.Swal.fire({
            icon: ICONES_SWAL[typeFinal] || "info",
            title: TITRES[typeFinal] || TITRES.info,
            text: message,
            confirmButtonText: "OK",
            confirmButtonColor: "#0B63F6",
            buttonsStyling: true
        });
    }

    // Messages courts d'avertissement/info -> toast discret (coin de l'écran).
    // Messages importants (succès/erreur) -> pop-up centrée type SweetAlert2,
    // pour un rendu professionnel et bien visible.
    function notifier(message, type) {
        const messageClair = traduireMessage(message);
        const typeFinal = type || detecterType(messageClair);

        const utiliserPopup = typeFinal === "succes" || typeFinal === "erreur";

        return new Promise((resoudre) => {

            if (utiliserPopup) {
                if (sweetAlertPret && window.Swal) {
                    afficherPopup(messageClair, typeFinal).then(resoudre);
                } else {
                    filesAttente.push(() => afficherPopup(messageClair, typeFinal).then(resoudre));
                    // Si SweetAlert2 met du temps (ou ne charge pas), on affiche
                    // quand même un toast tout de suite pour ne jamais faire
                    // attendre l'utilisateur sans réponse visuelle.
                    setTimeout(() => {
                        if (!sweetAlertPret) {
                            afficherToast(messageClair, typeFinal);
                            setTimeout(resoudre, DUREE_AFFICHAGE[typeFinal] || 4500);
                        }
                    }, 1200);
                }
            } else {
                afficherToast(messageClair, typeFinal);
                setTimeout(resoudre, DUREE_AFFICHAGE[typeFinal] || 4500);
            }

        });
    }

    // Écran de chargement plein écran, réutilisable ailleurs dans le site
    // via window.showLoading("Connexion...") / window.hideLoading().
    let overlayChargement = null;
    function showLoading(message) {
        injecterStylesToast();
        hideLoading();
        overlayChargement = document.createElement("div");
        overlayChargement.className = "eduforci-loading-overlay";
        overlayChargement.innerHTML = `
            <div class="eduforci-spinner"></div>
            <div class="eduforci-loading-texte"></div>
        `;
        overlayChargement.querySelector(".eduforci-loading-texte").textContent = message || "Chargement...";
        document.body.appendChild(overlayChargement);
    }
    function hideLoading() {
        if (overlayChargement) {
            overlayChargement.remove();
            overlayChargement = null;
        }
    }

    // On garde une référence à l'alert natif au cas où, et on expose
    // une API moderne en plus du remplacement d'alert().
    window.__nativeAlert = window.alert;
    window.alert = function (message) {
        return notifier(message);
    };
    window.notify = notifier;
    window.showLoading = showLoading;
    window.hideLoading = hideLoading;

})();

 
