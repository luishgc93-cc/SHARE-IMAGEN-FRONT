import { useState } from "react";
import '../estilos/ArrastrarFoto.css';
import API from './APIS/api';
import Spinner from "react-spinkit";

function ArrastrarFoto() {

const [form_data, set_form_data] = useState();

const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/a', form_data)
}

const send_image = (files) => {
    const formData = new FormData();
    formData.append('file', files)
    set_form_data(formData)
    console.log(formData)
}

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
            }}
            />
            <div className="text-information">
              <h3 className="arrastre">Arrastre o seleccione la imagen que desea compartir</h3>
            </div>
          </div>
          <div className="center">
          <img
            src=""
            alt=""
            height="150px"
            width="250px"
          />
          </div>
          <div className="center">
          <button>Subir Imagen</button>
          </div>
        </form>
    </div>
    
  );
}

export default ArrastrarFoto;