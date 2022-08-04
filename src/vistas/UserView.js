import React from "react";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);

function UserView(userData) {
  console.log(userData)
const email = userData.user.email;

  return(
    <>
    <div>Hola, usuario {email}</div>
    <button onClick={() => signOut(auth)}> Cerrar sesión</button>
    </>
  );
}

export default UserView;