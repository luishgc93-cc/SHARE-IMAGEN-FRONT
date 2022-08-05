import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
//VISTAS Y COMPONENTES
import ArrastrarFoto from './componentes/ArrastrarFoto';
import Login from './componentes/Login';
import UserView from './componentes/UserView';

//FIREBASE
import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
//


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


function App() {

  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //funcion final

      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

if(user){
  return (
  <div className='aplicacion-fotos'>    
    <div className='fotos-lista-principal'>
      <h1>Compartir fotos mediante enlaces</h1>
      <div className="center">
        <UserView user={user} />
      </div>
      <hr className="separador"></hr>
        <ArrastrarFoto />
    </div>
  </div>
    );
}else{
  return (
  <div className='aplicacion-fotos'>
    <div className='fotos-lista-principal'>
      <h1>Compartir fotos mediante enlaces</h1>
      <div className="center">
        <Login />
      </div>
      <hr className="separador"></hr>
      <ArrastrarFoto />
    </div>
  </div>
    );
}

}
export default App;
