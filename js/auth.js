import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
  runTransaction
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
// ==============================
// GÉNÉRATION D'IDENTIFIANTS
// ==============================

async function genererIdentifiant(type, prefixe) {

  const compteurRef = doc(db, "compteurs", type);

  const numero = await runTransaction(db, async (transaction) => {

    const compteurDoc = await transaction.get(compteurRef);

    if (!compteurDoc.exists()) {
      throw new Error("Le compteur '" + type + "' n'existe pas.");
    }

    const dernierNumero = compteurDoc.data().dernierNumero || 0;

    const nouveauNumero = dernierNumero + 1;

    transaction.update(compteurRef, {
      dernierNumero: nouveauNumero
    });

    return nouveauNumero;

  });

  const annee = new Date().getFullYear();

  return `${prefixe}-${annee}-${String(numero).padStart(6, "0")}`;

}
// ==============================
// INSCRIPTION PARENT
// ==============================

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

    alert("Compte Parent créé avec succès !");

    window.location.href = "dashboard-parent.html";

  } catch (error) {

    alert(error.message);

  }

}
// ==============================
// CONNEXION PARENT
// ==============================

async function connexionParent(email, motDePasse) {

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      motDePasse
    );

    alert("Connexion réussie !");

    window.location.href = "dashboard-parent.html";

  } catch (error) {

    alert(error.message);

  }

}
// ==============================
// INSCRIPTION ENSEIGNANT
// ==============================

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
      role: "enseignant",
      dateCreation: new Date().toISOString()

    });

    alert("Compte Enseignant créé avec succès !");

    window.location.href = "dashboard-enseignant.html";

  } catch (error) {

    alert(error.message);

  }

}
// ==============================
// CONNEXION ENSEIGNANT
// ==============================

async function connexionEnseignant(email, motDePasse) {

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      motDePasse
    );

    alert("Connexion réussie !");

    window.location.href = "dashboard-enseignant.html";

  } catch (error) {

    alert(error.message);

  }

}

// ==============================
// DÉCONNEXION
// ==============================

async function deconnexion() {

  try {

    await signOut(auth);

  } catch (error) {

    alert(error.message);

  }

}
export {
  creerCompteParent,
  connexionParent,
  creerCompteEnseignant,
  connexionEnseignant,
  deconnexion
};
