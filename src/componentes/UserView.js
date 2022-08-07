import API from './APIS/api';
import { useState,useEffect } from "react";
import { deletePhotoUser } from '../firebase/fireActions';
import '../estilos/UserView.css';
import Photo from "./Photo";
import { getAuth, signOut} from "firebase/auth";
import firebaseApp from "../firebase/credenciales";
const auth = getAuth(firebaseApp);

function UserView(userData) {
  const [verFotosSubidas, setVerFotosSubidas] = useState(null);
  const[links, setLinks] = useState([]);
  const email = userData.user.email;
  
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
    deletePhotoUser(userData,nuevosEnlaces);

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