import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

    alert("Compte Parent créé avec succès !");

    window.location.href = "dashboard-parent.html";

  } catch (error) {

    alert(error.code + "\n\n" + error.message);

  }

}

// ======================================
// CONNEXION PARENT
// ======================================

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

    alert("Compte Enseignant créé avec succès !");

    window.location.href = "dashboard-enseignant.html";

  } catch (error) {

    alert(error.code + "\n\n" + error.message);

  }

}

// ======================================
// CONNEXION ENSEIGNANT
// ======================================

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

    alert("Compte Établissement créé avec succès !");

    window.location.href = "dashboard-etablissement.html";

  } catch (error) {

    alert(error.code + "\n\n" + error.message);

  }

}

// ======================================
// CONNEXION ÉTABLISSEMENT
// ======================================

async function connexionEtablissement(email, motDePasse) {

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      motDePasse
    );

    alert("Connexion réussie !");

    window.location.href = "dashboard-etablissement.html";

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
  deconnexion
};
