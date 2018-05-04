// Initialize Firebase
var config = {
    apiKey: "AIzaSyBv-nfWRuZSU0ZVRSR6dYeeH2hLeVzDz-Y",
    authDomain: "app-firebase-10671.firebaseapp.com",
    databaseURL: "https://app-firebase-10671.firebaseio.com",
    projectId: "app-firebase-10671",
    storageBucket: "app-firebase-10671.appspot.com",
    messagingSenderId: "947077323772"
};
firebase.initializeApp(config);

// Login
const provider = new firebase.auth.GoogleAuthProvider();

// Ingreso de usuario existente
function ingresar() {

    firebase.auth()
        .signInWithPopup(provider) // Ventana popup de autenticación
        .then(function(result) {
            // console.log(result.user);

            // Cuando ya se otorgo el permiso
            $("body").fadeOut("fast", function() {
                window.location.href = "admin.html";
            });
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('> ... errorCode: ' + errorCode);
            console.log('> ... errorMessage: ' + errorMessage);
        });

}

function registrar() {
    firebase
        .auth()
        .signInWithPopup(provider) // Ventana popup de autenticación
        .then(function(result) {
            // console.log(result.user);

            console.log("> ... Registrando usuario: Usuario registrado!");
        });
}

/**
 * Verificar status del usuario
 */
function observador() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            // console.log(user);
            console.log('> ... Verificando usuario: Existe el usuario!');

        } else {
            // No user is signed in.
            console.log('> ... Verificando usuario: No existe!');

            $("body").fadeOut("fast", function() {
                window.location.href = "index.html";
            });
        }
    });
}

function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("> ... Saliendo");

        $("body").fadeOut("fast", function() {
            window.location.href = "index.html";
        });

    }).catch(function(error) {
        // An error happened.
        console.log('> ... Error: ' + error);
    });
}