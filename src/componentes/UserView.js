import API from './APIS/api';
import { useState,useEffect } from "react";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut, updateProfile,deleteUser } from "firebase/auth";
import '../estilos/UserView.css';
import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";

import Photo from "./Photo";

const auth = getAuth(firebaseApp);

function UserView(userData) {
  const [verFotosSubidas, setVerFotosSubidas] = useState(null);
  const[links, setLinks] = useState([]);
  const email = userData.user.email;
  const firestore = getFirestore(firebaseApp);
  
  useEffect(() => {
    setLinks(userData.user.links);
  }, [])

  const borrarFoto = (e) => {
    var recortar = e.photo.indexOf('/')
    var hasta = e.photo.indexOf('.')
    var linkConBarra = e.photo.substring(recortar,hasta)
    const link = linkConBarra.replace('/', '');

    var nuevosEnlaces = links.filter((item) => item.photo !== e.photo);
    setLinks(nuevosEnlaces);
    update(nuevosEnlaces);

    API.post('/bye', {
      photo: link, 
    })
      .then(response => {
        
        if (response.status === 200 && response.data.result === 'ok'){

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

  function update(nuevosEnlaces){
    const currentUser = userData.user;
    const email = currentUser.email;
    const rol = 'user'
    const docuRef = doc(firestore, `usuarios/${currentUser.uid}`);
    const linksAnteriores = currentUser.links
    setDoc(docuRef, { email: email, rol: rol, links: nuevosEnlaces });
  }

  if(verFotosSubidas === true && links !== null && links.length > 0){
    return(
      <>
    <div className="center">
      <div className="usuario">Hola, usuario {email}</div>
    </div>

    <div className="center">
      <button onClick={() => setVerFotosSubidas(false)} className="cerrar-Sesion">Cerrar fotos compartidas</button>
      <button onClick={() => signOut(auth)} className="cerrar-Sesion">Cerrar sesión</button>
    </div>

    <div> 
        {
          links.map((link,key) =>
          <Photo 
          id={key}
          link={link}
          key={key}
          borrarFoto={borrarFoto}
          />
          )
        }
      </div>
      </>
    );
  }else{
    return(
      <>
  <div className="center">
    <div className="usuario">Hola, usuario {email}</div>
  </div>

  <div className="center">
    <button onClick={() => links.length > 0 ? setVerFotosSubidas(true) : alert('No hay fotos subidas en esta cuenta de usuario.')} className="cerrar-Sesion">Ver fotos compartidas</button>
    <button onClick={() => signOut(auth)} className="cerrar-Sesion">Cerrar sesión</button>
  </div>

      </>
    );
  }


}

export default UserView;