import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
// Création d'un compte Parent
async function creerCompteParent(nom, telephone, email, motDePasse) {

  try {

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      motDePasse
    );

    const user = userCredential.user;

    await setDoc(doc(db, "parents", user.uid), {
      uid: user.uid,
      nom: nom,
      telephone: telephone,
      email: email,
      role: "parent",
      dateCreation: new Date().toISOString()
    });

    alert("Compte créé avec succès !");

  } catch (error) {
    alert(error.message);
  }

}
  // Connexion Parent
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
export {
  creerCompteParent,
  connexionParent
};
