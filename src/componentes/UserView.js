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
  console.log(links)
  if(verFotosSubidas === true){
    return(
      <>
      <div className="usuario">Hola, usuario {email}</div>
      <div>
      <button onClick={() => setVerFotosSubidas(false)} className="cerrar-Sesion">Cerrar fotos compartidas</button>
      <button onClick={() => signOut(auth)} className="cerrar-Sesion">Cerrar sesión</button>
      </div>
      <div>
      {
        links.map((link,key) =>
        <Photo 
        id={key}
        link={link}
        />
        )
     }
      </div>
      </>
    );
  }else{
    return(
      <>
      <div className="usuario">Hola, usuario {email}</div>
      <div>
      <button onClick={() => setVerFotosSubidas(true)} className="cerrar-Sesion">Ver fotos compartidas</button>
      <button onClick={() => signOut(auth)} className="cerrar-Sesion">Cerrar sesión</button>
      </div>
      </>
    );
  }


}

export default UserView;