import { useState } from "react";
import '../estilos/ArrastrarFoto.css';

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
    </div>
  );
}

export default ArrastrarFoto;