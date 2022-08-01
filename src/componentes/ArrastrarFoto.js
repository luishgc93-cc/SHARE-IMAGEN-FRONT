import { useState } from "react";
import '../estilos/ArrastrarFoto.css';
import API from './APIS/api';
import Spinner from "react-spinkit";

function ArrastrarFoto() {
  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);
  const changeImage = (e) => {
    console.log(e.target.files);
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result); 

      };
    }
  };

  const manejarEnvio = e => {
    e.preventDefault();
    console.log('subiendo...');
    API.post()
    .then(response => {
      if (response.status === 200){
        alert('subido');
      }else{
        alert('errooor de subida');
      }

    })
    .catch(error => {
      alert('error de subida');
    });

};


  return (
    <div>
        <br />
        <div className="image-upload-wrap">
          <input
            className="file-upload-input"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              changeImage(e);
            }}
          />
          <div className="text-information">
            <h3 className="arrastre">Arrastre o seleccione la imagen que desea compartir</h3>
          </div>
        </div>

        <div className="center">
          <img
            src={ImageSelectedPrevious}
            alt=""
            height="150px"
            width="250px"
          />
        </div>
        <div className="center">
          <form className="tarea-formulario"
          onSubmit={manejarEnvio}>
                <button className="tarea-boton">Subir Imagen</button>
          </form>
        </div>
    </div>
  );
}

export default ArrastrarFoto;