import API from './APIS/api';
import React from "react";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut, updateProfile,deleteUser } from "firebase/auth";
import '../estilos/UserView.css';
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

function Photo({ id, link }){

  const borrarFoto = (e) => {
  var recortar = e.indexOf('/')
  var hasta = e.indexOf('.')
  var linkConBarra = e.substring(recortar,hasta)
  const link = linkConBarra.replace('/', '');

  API.post('/bye', {
    photo: link, 
  })
    .then(response => {
      console.log(response)
      if (response.status === 200 && response.data.result === 'ok'){
        console.log(response.data)
        alert('Imagen borrada correctamente');
      }else if(response.status === 200 && response.data.result === 'not found'){
        alert('Imagen no encontrada');
      }else{
        alert('error de borrado, estatus no es 200');
      }
    })
    .catch(error => {
      console.log(error)
      alert('error de borrado cath');
    });
}

  return(
    <div className="lista-fotos">
      <img id={id}
          src={ 'https://res.cloudinary.com/dmo3iliks/image/upload/' + link }
          height="25%"
          width="25%"
        />
        <a href={ '?id=' + link } >
        <button className="cerrar-Sesion">Ver enlace</button>
        </a>
        <button className='cerrar-Sesion' onClick={()=>borrarFoto(link)}>Borrar Foto</button>
    </div>
    );
}

export default Photo;