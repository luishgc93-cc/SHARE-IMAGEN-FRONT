import logo from './logo.svg';
import './App.css';
import ArrastrarFoto from './componentes/ArrastrarFoto';

function App() {
  return (
  <div className='aplicacion-fotos'>
  <div className='fotos-logo-contenedor'>
  </div>
    <div className='fotos-lista-principal'>
    <h1>Compartir fotos mediante enlaces</h1>
    <ArrastrarFoto />
  </div>
  </div>
  );
}

export default App;
