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
      <img id={id}
          src={'https://res.cloudinary.com/dmo3iliks/image/upload/' + link}
          height="25%"
          width="25%"
        />
    </div>
    );
}

export default Photo;