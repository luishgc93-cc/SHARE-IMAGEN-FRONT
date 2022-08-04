import React from "react";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";
import '../estilos/UserView.css';

const auth = getAuth(firebaseApp);

function UserView(userData) {
  console.log(userData)
const email = userData.user.email;

  return(
    <>
    <div className="usuario">Hola, usuario {email}</div>
    <button onClick={() => signOut(auth)} className="cerrar-Sesion"> Cerrar sesión</button>
    </>
  );
}

export default UserView;