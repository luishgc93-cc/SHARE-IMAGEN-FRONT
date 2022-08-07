import firebaseApp from "./credenciales";
import { getAuth, signOut, updateProfile,deleteUser } from "firebase/auth";
import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const updateUser = async (currentUser,link) => {
  const email = currentUser.user.email;
  const rol = 'user'
  const docuRef = doc(firestore, `usuarios/${currentUser.user.uid}`);
  const linksAnteriores = currentUser.user.links
  console.log(linksAnteriores)
  if(linksAnteriores){
    setDoc(docuRef, { email: email, rol: rol, links: [link, ...linksAnteriores] });
  }else{
    setDoc(docuRef, { email: email, rol: rol, links: [link] });
  }
};

export const deletePhotoUser = async (x,link) => {
  const currentUser = x.user;
  const email = currentUser.email;
  const rol = 'user'
  const docuRef = doc(firestore, `usuarios/${currentUser.uid}`);
  const linksAnteriores = currentUser.links
  setDoc(docuRef, { email: email, rol: rol, links: link });
};