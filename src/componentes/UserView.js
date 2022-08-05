import React from "react";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut, updateProfile,deleteUser } from "firebase/auth";
import '../estilos/UserView.css';
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

function UserView(userData) {
const email = userData.user.email;
const firestore = getFirestore(firebaseApp);

  update(userData);

  function update(currentUser) {
    console.log(currentUser)

    const docuRef = doc(firestore, `usuarios/${currentUser.user.uid}`);
    setDoc(docuRef, { photoURL: 'zzzz', rol: 'vipss' });
  }

  return(
    <>
    <div className="usuario">Hola, usuario {email}</div>
    <button onClick={() => signOut(auth)} className="cerrar-Sesion"> Cerrar sesión</button>
    </>
  );
}

export default UserView;