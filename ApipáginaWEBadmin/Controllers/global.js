import { 
    initializeApp 
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { 
    getFirestore, 
    doc, 
    setDoc
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    sendEmailVerification, 
    deleteUser
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyDrrSpREGjAaVTzrAfMCHmOL-gaIQojI7w",
  authDomain: "api2024-b568b.firebaseapp.com",
  projectId: "api2024-b568b",
  storageBucket: "api2024-b568b.appspot.com",
  messagingSenderId: "26726093552",
  appId: "1:26726093552:web:9329993151e91d25f92835",
  measurementId: "G-Q401V0L3BG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export const login_auth = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

export const logout = () =>
    signOut(auth);
  
export function userstate() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid);
        } else {
            window.location.href = '../index.html';
        }
    });
} 

export const registerauth = (email, password, cedula, fechaNacimiento, direccion, telefono, nombre, apellido) => 
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (userCredential) {
              
                const user = userCredential.user;
               
                sendEmailVerification(user)
                    .then(() => {
                        console.log('Correo de verificación enviado');
                    })
                    .catch((error) => {
                        console.error('Error al enviar el correo de verificación', error);
                    });
        
                return setDoc(doc(db, "users", user.uid), {
                    nombre: nombre, 
                    apellido: apellido, 
                    cedula: cedula,
                    fechaNacimiento: fechaNacimiento,
                    direccion: direccion,
                    telefono: telefono, 
                }).then(() => userCredential); 
            } else {
                console.error("Error: userCredential es undefined");
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });


// Google
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => 
    signInWithPopup(auth, googleProvider);

// Facebook
export const facebookProvider = new FacebookAuthProvider();

export const signInWithFacebook = () => 
    signInWithPopup(auth, facebookProvider);
        

export const recoverPassword = (email) => //recuperar  contraseña
    sendPasswordResetEmail(auth, email);

export{db}; 
export{auth}; 
export{deleteUser};