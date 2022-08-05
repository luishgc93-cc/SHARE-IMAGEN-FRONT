import React from "react";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut, updateProfile,deleteUser } from "firebase/auth";
import '../estilos/UserView.css';
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

function Photo({ id, link }){
  console.log(id, link  )
  return(
    <div className="lista-fotos-subidas">
      <div id={id} className="center">
        {link}
      </div>  
    </div>
    );
}

export default Photo;