import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// ======================================
// GÉNÉRATION DES IDENTIFIANTS
// ======================================

async function genererIdentifiant(type, prefixe) {

  const compteurRef = doc(db, "compteurs", type);

  const compteurSnap = await getDoc(compteurRef);

  if (!compteurSnap.exists()) {
    throw new Error("Document compteur introuvable : " + type);
  }

  const data = compteurSnap.data();

  const numero = data.dernierNumero + 1;

  await updateDoc(compteurRef, {
    dernierNumero: increment(1)
  });

  const annee = new Date().getFullYear();

  return `${prefixe}-${annee}-${String(numero).padStart(6, "0")}`;

}
// ======================================
// INSCRIPTION PARENT
// ======================================

async function creerCompteParent(nom, telephone, email, motDePasse) {

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      motDePasse
    );

    const user = userCredential.user;

    const identifiant = await genererIdentifiant(
      "parents",
      "PAR"
    );

    await setDoc(doc(db, "parents", user.uid), {

      uid: user.uid,
      identifiant: identifiant,
      nom: nom,
      telephone: telephone,
      email: email,
      role: "parent",
      dateCreation: new Date().toISOString()

    });

    await sendEmailVerification(user);
    await signOut(auth);

    await alert("Compte créé avec succès ! Un e-mail de confirmation a été envoyé à " + email + ". Merci de cliquer sur le lien reçu avant de vous connecter.\n\n⚠️ Si vous ne le voyez pas d'ici quelques minutes, regardez dans le dossier \"Spam\" ou \"Courrier indésirable\" de votre boîte mail : c'est souvent là qu'il atterrit la première fois.");

    window.location.href = "connexion-parent.html";

  } catch (error) {

    alert(error.code + "\n\n" + error.message);

  }

}

// ======================================
// CONNEXION PARENT
// ======================================

async function connexionParent(email, motDePasse) {

  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      motDePasse
    );

    const user = userCredential.user;

    if (!user.emailVerified) {

      try {
        await sendEmailVerification(user);
      } catch (erreurEnvoi) {
        // On ignore un éventuel blocage anti-spam de Firebase (trop de tentatives) :
        // le message ci-dessous reste valable même si le renvoi échoue.
      }

      await signOut(auth);

      alert("Votre adresse e-mail n'est pas encore confirmée. Un lien de confirmation vient de vous être envoyé à " + email + ". Merci de cliquer dessus avant de vous connecter.\n\n⚠️ Pensez à regarder dans le dossier \"Spam\" ou \"Courrier indésirable\" de votre boîte mail.");

      return;

    }

    const parentSnap = await getDoc(doc(db, "parents", user.uid));

    if (!parentSnap.exists()) {

      await signOut(auth);

      alert("Ce compte n'est pas un compte Parent.");

      return;

    }

    window.location.href = "dashboard-parent.html";

  } catch (error) {

    alert(error.code + "\n\n" + error.message);

  }

}

// ======================================
// INSCRIPTION ENSEIGNANT
// ======================================

async function creerCompteEnseignant(
  nom,
  telephone,
  email,
  ville,
  matiere,
  niveau,
  experience,
  diplome,
  presentation,
  motDePasse
) {

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      motDePasse
    );

    const user = userCredential.user;

    const identifiant = await genererIdentifiant(
      "enseignants",
      "ENS"
    );

    await setDoc(doc(db, "enseignants", user.uid), {

  uid: user.uid,
  identifiant: identifiant,

  nom: nom,
  telephone: telephone,
  email: email,

  ville: ville,
  matiere: matiere,
  niveau: niveau,

  experience: experience,
  diplome: diplome,
  presentation: presentation,

  // Nouveaux champs
photo: "",
cv: "",
tarif: 0,
modeCours: [],
note: 0,
nombreAvis: 0,

verification: false,
statutVerification: "En attente",

disponibilite: "Disponible",

  role: "enseignant",
  dateCreation: new Date().toISOString()

});

    await sendEmailVerification(user);
    await signOut(auth);

    await alert("Compte créé avec succès ! Un e-mail de confirmation a été envoyé à " + email + ". Merci de cliquer sur le lien reçu avant de vous connecter.\n\n⚠️ Si vous ne le voyez pas d'ici quelques minutes, regardez dans le dossier \"Spam\" ou \"Courrier indésirable\" de votre boîte mail : c'est souvent là qu'il atterrit la première fois.");

    window.location.href = "connexion-enseignant.html";

  } catch (error) {

    alert(error.code + "\n\n" + error.message);

  }

}

// ======================================
// CONNEXION ENSEIGNANT
// ======================================
async function connexionEnseignant(email, motDePasse) {

  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      motDePasse
    );

    const user = userCredential.user;

    if (!user.emailVerified) {

      try {
        await sendEmailVerification(user);
      } catch (erreurEnvoi) {}

      await signOut(auth);

      alert("Votre adresse e-mail n'est pas encore confirmée. Un lien de confirmation vient de vous être envoyé à " + email + ". Merci de cliquer dessus avant de vous connecter.\n\n⚠️ Pensez à regarder dans le dossier \"Spam\" ou \"Courrier indésirable\" de votre boîte mail.");

      return;

    }

    const enseignantSnap = await getDoc(doc(db, "enseignants", user.uid));

    if (!enseignantSnap.exists()) {

      await signOut(auth);

      alert("Ce compte n'est pas un compte Enseignant.");

      return;

    }

    window.location.href = "dashboard-enseignant.html";

  } catch (error) {

    alert(error.code + "\n\n" + error.message);

  }

}
// ======================================
// INSCRIPTION ÉTABLISSEMENT
// ======================================

async function creerCompteEtablissement(
  nom,
  responsable,
  telephone,
  email,
  ville,
  adresse,
  type,
  niveaux,
  description,
  motDePasse
) {

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      motDePasse
    );

    const user = userCredential.user;

    const identifiant = await genererIdentifiant(
      "etablissements",
      "ETB"
    );

    await setDoc(doc(db, "etablissements", user.uid), {

      uid: user.uid,
      identifiant: identifiant,
      nom: nom,
      responsable: responsable,
      telephone: telephone,
      email: email,
      ville: ville,
      adresse: adresse,
      type: type,
      niveaux: niveaux,
      description: description,
      role: "etablissement",
      dateCreation: new Date().toISOString()

    });

    await sendEmailVerification(user);
    await signOut(auth);

    await alert("Compte créé avec succès ! Un e-mail de confirmation a été envoyé à " + email + ". Merci de cliquer sur le lien reçu avant de vous connecter.\n\n⚠️ Si vous ne le voyez pas d'ici quelques minutes, regardez dans le dossier \"Spam\" ou \"Courrier indésirable\" de votre boîte mail : c'est souvent là qu'il atterrit la première fois.");

    window.location.href = "connexion-etablissement.html";

  } catch (error) {

    alert(error.code + "\n\n" + error.message);

  }

}

// ======================================
// CONNEXION ÉTABLISSEMENT
// ======================================

async function connexionEtablissement(email, motDePasse) {

  try {

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      motDePasse
    );

    const user = userCredential.user;

    if (!user.emailVerified) {

      try {
        await sendEmailVerification(user);
      } catch (erreurEnvoi) {}

      await signOut(auth);

      alert("Votre adresse e-mail n'est pas encore confirmée. Un lien de confirmation vient de vous être envoyé à " + email + ". Merci de cliquer dessus avant de vous connecter.\n\n⚠️ Pensez à regarder dans le dossier \"Spam\" ou \"Courrier indésirable\" de votre boîte mail.");

      return;

    }

    const etablissementSnap = await getDoc(doc(db, "etablissements", user.uid));

    if (!etablissementSnap.exists()) {

      await signOut(auth);

      alert("Ce compte n'est pas un compte Établissement.");

      return;

    }

    window.location.href = "dashboard-etablissement.html";

  } catch (error) {

    alert(error.code + "\n\n" + error.message);

  }

}
// ======================================
// MOT DE PASSE OUBLIÉ
// ======================================

async function motDePasseOublie(email) {

  try {

    await sendPasswordResetEmail(auth, email);

    alert(
      "Un e-mail de réinitialisation a été envoyé à " +
      email +
      ". Vérifiez également le dossier Spam."
    );

  } catch (error) {

    alert(error.code + "\n\n" + error.message);

  }

}

// ======================================
// DÉCONNEXION
// ======================================

async function deconnexion() {

  try {

    await signOut(auth);

  } catch (error) {

    alert(error.code + "\n\n" + error.message);

  }

}

// ======================================
// EXPORTS
// ======================================

export {
  creerCompteParent,
  connexionParent,
  creerCompteEnseignant,
  connexionEnseignant,
  creerCompteEtablissement,
  connexionEtablissement,
  motDePasseOublie,
  deconnexion
};
      
