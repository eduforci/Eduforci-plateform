// ============================================================
// Utilitaire de sécurité : échappement HTML
// ------------------------------------------------------------
// Empêche l'injection de code (XSS) via tout texte saisi par un
// utilisateur (message, commentaire, description, nom, etc.)
// et affiché ensuite via innerHTML sur une autre page.
//
// À utiliser à chaque fois qu'une donnée provenant de Firestore
// (ou de tout autre utilisateur) est insérée dans un template
// HTML : ${echapperHTML(valeur)} au lieu de ${valeur}.
// ============================================================

export function echapperHTML(valeur) {

    if (valeur === null || valeur === undefined) return "";

    return String(valeur)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
