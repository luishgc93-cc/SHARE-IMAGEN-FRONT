import API from './APIS/api';
import { useState,useEffect } from "react";
import '../estilos/ArrastrarFoto.css';
import Spinner from "react-spinkit";
import {CopyToClipboard} from 'react-copy-to-clipboard';


function ArrastrarFoto() {

const [form_data, set_form_data] = useState();
const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);
const [UrlImagen, setUrlImagen] = useState(null);

  useEffect(() => {
    const URLactual = window.location;
    let url = new URL(URLactual);
    let urlObteniendoId = url.searchParams.get("id");
    setUrlImagen(urlObteniendoId)
  }, [])

const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/a', form_data,{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(response => {
      console.log(response)
      if (response.status === 200){
        alert('subido');
        const UrlImagenOriginal = response.data.secure_url;
        const UrlRecortada = UrlImagenOriginal.replace('https://res.cloudinary.com/dmo3iliks/image/upload/','')
        setUrlImagen(UrlRecortada);

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
    console.log(formData)
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
  const UrlServicio = ('http://localhost:3000?id=' + UrlImagen);
  return(
    <div>
      <img
        src={'https://res.cloudinary.com/dmo3iliks/image/upload/' + UrlImagen}
        alt=""
        height="350px"
        width="550px"
      />
      <input type="text" name="inputname" value={UrlServicio} readOnly className="input"/>

      <CopyToClipboard text={UrlServicio}>
        <button>Copiar enlace</button>
      </CopyToClipboard>
    </div>
  );
  }
else{
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