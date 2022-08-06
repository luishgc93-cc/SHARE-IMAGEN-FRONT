import API from './APIS/api';
import { useState,useEffect } from "react";
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut, updateProfile,deleteUser } from "firebase/auth";
import '../estilos/UserView.css';
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
import Photo from "./Photo";

const auth = getAuth(firebaseApp);

function UserView(userData) {
  const [verFotosSubidas, setVerFotosSubidas] = useState(null);
  const email = userData.user.email;
  const firestore = getFirestore(firebaseApp);
  const links = userData.user.links;


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


  if(verFotosSubidas === true && links !== null){
    return(
      <>
  <div className="center">
    <div>Hola, usuario {email}
    </div>
    <div>
      <button onClick={() => setVerFotosSubidas(false)} className="cerrar-Sesion">Cerrar fotos compartidas</button>
      <button onClick={() => signOut(auth)} className="cerrar-Sesion">Cerrar sesión</button>
    </div>
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
      <div>
      <button onClick={() => links ? setVerFotosSubidas(true) : alert('No hay fotos subidas en esta cuenta de usuario.')} className="cerrar-Sesion">Ver fotos compartidas</button>
      <button onClick={() => signOut(auth)} className="cerrar-Sesion">Cerrar sesión</button>
      </div>
  </div>

      </>
    );
  }


}

export default UserView;