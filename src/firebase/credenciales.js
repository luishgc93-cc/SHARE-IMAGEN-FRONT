// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyCjCvLXZiB_l5JmnCb0Rq6ZV9Jq5qDD-4A",
  authDomain: "share-imagen-usuarios-links.firebaseapp.com",
  projectId: "share-imagen-usuarios-links",
  storageBucket: "share-imagen-usuarios-links.appspot.com",
  messagingSenderId: "537540383482",
  appId: "1:537540383482:web:f88b24cb6a947129822f43"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;