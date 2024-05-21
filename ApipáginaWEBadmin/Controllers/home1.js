import{userstate, logout, deleteUser, auth, db} from '../Controllers/global.js'
import { deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
userstate()



const eliminar_cuenta = document.getElementById('eliminar')
const sesion = document.getElementById('boton_salir')

async function cerrarsesion(){
    const verificacion=logout()
    const comprobar = await verificacion

    .then((comprobar)=>{
        alert('Sesion cerrada')
        window.location.href='../index.html'
    })
    .catch((error)=>{
        alert('Sesion no cerrada')
    })
}

async function eliminarUsuario(){
    try {
        const user = auth.currentUser;
        const userDoc = doc(db, 'users', user.uid);
        await deleteDoc(userDoc);
        await deleteUser(user);
        alert('Usuario eliminado, Adios');
        window.location.href='../index.html';
    } catch (error) {
        console.error('Error al eliminar el usuario, puede que lleves mucho tiempo logueado', error);
        alert('Error al eliminar, puede que lleves mucho tiemp logueado');
    }
}

window.addEventListener('DOMContentLoaded', async()=>{
    sesion.addEventListener('click', cerrarsesion)
    eliminar_cuenta.addEventListener('click', eliminarUsuario)
})