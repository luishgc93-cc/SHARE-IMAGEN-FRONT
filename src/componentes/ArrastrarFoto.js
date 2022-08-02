import { useState } from "react";
import '../estilos/ArrastrarFoto.css';
import API from './APIS/api';
import Spinner from "react-spinkit";

function ArrastrarFoto() {

const [form_data, set_form_data] = useState();
const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/a', form_data,{
              headers: {
                'Content-Type': 'application/json',
        },
    })
    .then(response => {
      console.log(response)
      if (response.status === 200){
        alert('subido');
      }else{
        alert('error de subida');
      }
    })
    .catch(error => {
      alert('error de subida');
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

if(ImageSelectedPrevious == null ){
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