// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyCiOQqyMuzKtsY4ugjsoKahL7tL5WFDyrM",
  authDomain: "share-imagen-react.firebaseapp.com",
  projectId: "share-imagen-react",
  storageBucket: "share-imagen-react.appspot.com",
  messagingSenderId: "351641624855",
  appId: "1:351641624855:web:e4d4c1695fb701a50a9752"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;