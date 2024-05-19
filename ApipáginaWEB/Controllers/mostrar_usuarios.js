import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { db } from './global.js';

async function getUsers() {
    const userList = document.getElementById('user-list');
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
        const user = doc.data();
        const userElement = document.createElement('div');
        const column1 = document.createElement('div');
        const column2 = document.createElement('div');

        column1.textContent = `Nombre: ${user.nombre} .---. Apellido: ${user.apellido} Cedula: ${user.cedula}`;
        column2.textContent = `Fecha de Nacimiento: ${user.fechaNacimiento} .---. Telefono: ${user.telefono} .---. Direccion: ${user.direccion}`; 

        userElement.appendChild(column1);
        userElement.appendChild(column2);
        userList.appendChild(userElement);
    });
}

getUsers();


getUsers();
