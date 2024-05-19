import{userstate, logout, deleteUser, auth, db, registerauth} from './global.js'
import { deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
userstate()

const eliminar_cuenta = document.getElementById('eliminar')
const sesion = document.getElementById('boton_salir')
const addUserForm = document.getElementById('add-user-form');

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

addUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('emailR').value;
    const contraseñaInput = document.getElementById('contraseñaR').value;
    const cedulaInput = document.getElementById('cedula').value;
    const fechaNacimientoInput = document.getElementById('fechaNacimiento').value;
    const direccionInput = document.getElementById('direccion').value;
    const telefonoInput = document.getElementById('telefono').value;
    const nombreInput = document.getElementById('nombre').value; 
    const apellidoInput = document.getElementById('apellido').value;

    try {
        const userCredential = await registerauth(emailInput, contraseñaInput, cedulaInput, fechaNacimientoInput, 
            direccionInput, telefonoInput, nombreInput, apellidoInput, false); 

        if (userCredential) {
            alert("El usuario se ha agregado exitosamente."); 
            document.getElementById('emailR').value = '';
            document.getElementById('contraseñaR').value = '';
            document.getElementById('cedula').value = '';
            document.getElementById('fechaNacimiento').value = '';
            document.getElementById('direccion').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
        } else {
            console.error("Error: userCredential es undefined");
        }
    } catch (error) {
        alert("Error al agregar"); 
    }
});

window.addEventListener('DOMContentLoaded', async()=>{
    sesion.addEventListener('click', cerrarsesion)
    eliminar_cuenta.addEventListener('click', eliminarUsuario)
})