import React, { useState } from "react";
import '../estilos/Login.css';

import firebaseApp from "../firebase/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

function Login() {
  const firestore = getFirestore(firebaseApp);
  const [isRegistrando, setIsRegistrando] = useState(false);

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol, links: [] });
  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = "user";
    if (isRegistrando) {
      registrarUsuario(email, password, rol);
    } else {
      signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (
    <div>
      <h2>{isRegistrando ? "Regístrate" : "Inicia sesión"}</h2>
     
      <p className="textoLoginRegistro">{isRegistrando ? "Registrate para poder ver todos las imágenes compartidas, poder borrarlas, editarlas, etc." : "Inicia sesión para ver tus imágenes compartidas."}</p>

      <form onSubmit={submitHandler}>
        <label>
          Correo electrónico:
          <input type="email" id="email" />
        </label>

        <label>
          Contraseña:
          <input type="password" id="password" />
        </label>

        <input
          type="submit"
          value={isRegistrando ? "Registrar" : "Iniciar sesión"}
        />
      </form>

      <button onClick={() => setIsRegistrando(!isRegistrando)} className="boton">
        {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
      </button>
    </div>
  );
}

export default Login;