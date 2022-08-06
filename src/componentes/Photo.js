import React from "react";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut, updateProfile,deleteUser } from "firebase/auth";
import '../estilos/UserView.css';
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

function Photo({ id, link, borrarFoto }){
  const LinkPhoto = link.photo;
  console.log(LinkPhoto)
  return(
    <div className="lista-fotos">
      <img id={id}
          src={ 'https://res.cloudinary.com/dmo3iliks/image/upload/' + LinkPhoto }
          height="25%"
          width="25%"
        />
        <a href={ '?id=' + LinkPhoto } >
        <button className="cerrar-Sesion">Ver enlace</button>
        </a>
        <button className='cerrar-Sesion' onClick={()=>borrarFoto(link)}>Borrar Foto</button>
    </div>
    );
}

export default Photo;