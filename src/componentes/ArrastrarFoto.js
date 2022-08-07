import API from './APIS/api';
import { useState,useEffect } from "react";
import '../estilos/ArrastrarFoto.css';
import Spinner from "react-spinkit";
import {CopyToClipboard} from 'react-copy-to-clipboard';
//FIREBASE
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut, updateProfile,deleteUser } from "firebase/auth";
import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


function ArrastrarFoto(userData) {
const [form_data, set_form_data] = useState();
const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);
const [UrlImagen, setUrlImagen] = useState(null);
const [loading, setLoading] = useState(null);


  function update(currentUser,link) {
    const email = userData.user.email;
    const rol = 'user'
    const docuRef = doc(firestore, `usuarios/${currentUser.user.uid}`);
    const linksAnteriores = userData.user.links
    console.log(linksAnteriores)
    if(linksAnteriores){
      setDoc(docuRef, { email: email, rol: rol, links: [link, ...linksAnteriores] });
    }else{
      setDoc(docuRef, { email: email, rol: rol, links: [link] });
    }
  }

  useEffect(() => {
    const URLactual = window.location;
    let url = new URL(URLactual);
    let urlObteniendoId = url.searchParams.get("id");
    setUrlImagen(urlObteniendoId)
  }, [])

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  await API.post('/a', form_data,{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(response => {
      console.log(response)
      setLoading(false);
      if (response.status === 200){
        const UrlImagenOriginal = response.data.secure_url;
        const UrlRecortada = UrlImagenOriginal.replace('https://res.cloudinary.com/dmo3iliks/image/upload/','')
        setUrlImagen(UrlRecortada);
        console.log(userData)
        const ConstLink = {
          photo: UrlRecortada,
      }
        update(userData,ConstLink);

      }else{
        alert('error de subida, estatus no es 200');
      }
    })
    .catch(error => {
      console.log(error)
      alert('error de subida cath');
    });
}

const send_image = (files) => {
    const formData = new FormData();
    formData.append('file', files)
    set_form_data(formData)
}

const previsualizarImagen = (e) => {
  if (e.target.files[0] !== undefined) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      e.preventDefault();
      setImageSelectedPrevious(e.target.result); 
    };
  }
};

if(ImageSelectedPrevious == null & UrlImagen == null){
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div className="image-upload-wrap">
        <input
          className="file-upload-input"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            send_image(e.target.files[0])
            previsualizarImagen(e);
        }}
        />
        <div className="text-information">
          <h3 className="arrastre">Arrastre o seleccione la imagen que desea compartir</h3>
        </div>
      </div>
      <div className="center">
      </div>
    </form>
  </div>
  );
}else if(UrlImagen){
  const UrlServicio = ('https://' + window.location.host + '?id=' + UrlImagen);
  return(
    <div>
      <div className="center">
        <input type="text" name="inputname" value={UrlServicio} readOnly className="enlace"/>
        <CopyToClipboard text={UrlServicio}>
          <button className="botonCopiar">Copiar enlace</button>
        </CopyToClipboard>
      </div>
      <div className="center-imagen">
        <img
          src={'https://res.cloudinary.com/dmo3iliks/image/upload/' + UrlImagen}
          alt=""
          height="50%"
          width="100%"
        />
      </div>
      <div className="center">
        <button
          onClick={() => document.location.href="/" }
          name='Subir otra imagen' className="botonCopiar"> Subir otra imagen</button>
      </div>
    </div>
  );
  }else if(loading === true) {
    return(
      <div className="overlay-content">
        <div className="wrapper">
          <Spinner name="line-scale" fadeIn="none" color="white"/>
          <span className="message">Subiendo imagen...</span>
        </div>
      </div>
    );
}else{
  return (
  <div>
    <div className="center">
    <img
      src={ImageSelectedPrevious}
      alt=""
      height="350px"
      width="550px"
    />
    </div>
    <div className="center">
          <form  onSubmit={handleSubmit}>
            <button type="submit" className='boton' >Subir Foto</button>
          </form>
    </div>
</div>
 );
}

}

export default ArrastrarFoto;