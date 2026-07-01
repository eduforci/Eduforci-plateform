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
async function creerCompteParent(nom, email, motDePasse) {

  try {

    // Création du compte Firebase
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        motDePasse
      );

    const user = userCredential.user;

    // Enregistrement dans Firestore
    await setDoc(doc(db, "parents", user.uid), {

      uid: user.uid,
      nom: nom,
      email: email,
      role: "parent",
      dateCreation: new Date().toISOString()

    });

    alert("Compte créé avec succès !");

  } catch (error) {

    alert(error.message);

  }

}
export { creerCompteParent };
