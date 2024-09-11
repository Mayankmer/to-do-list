import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"

const appSettings = {
    apiKey: "AIzaSyAcpRftHqctHKYgWuV6oscN3EGnhiarPjA",
    authDomain: "realtime-database-1809b.firebaseapp.com",
    databaseURL: "https://realtime-database-1809b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "realtime-database-1809b",
    storageBucket: "realtime-database-1809b.appspot.com",
    messagingSenderId: "228703995594",
    appId: "1:228703995594:web:45c26086b99c65e44fd633"
}
const app = initializeApp(appSettings)
const auth = getAuth(app)

// Get DOM elements
const emailField = document.getElementById("email")
const passwordField = document.getElementById("password")
const loginButton = document.getElementById("login-button")
const signupButton = document.getElementById("signup-button")
const authStatus = document.getElementById("auth-status")

// Log in an existing user
loginButton.addEventListener("click", () => {
    const email = emailField.value
    const password = passwordField.value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let user = userCredential.user
            authStatus.textContent = "Logged in successfully!"
            window.location.href = "list.html" // Redirect to main page
        })
        .catch((error) => {
            authStatus.textContent = "Invalid user"
        })
})

// Sign up a new user
signupButton.addEventListener("click", () => {
    alert('button cliked')
    const email = emailField.value
    const password = passwordField.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let user = userCredential.user
            authStatus.textContent = "Account created successfully!"
            window.location.href = "list.html" // Redirect to main page
        })
        .catch((error) => {
            authStatus.textContent = error.message
        })
})

// Handle auth state change (check if user is logged in)
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, set user ID (UID)
        const uid = user.uid
        console.log(`User ID: ${uid}`)
        // Now you can use `uid` to store and fetch data specific to this user
    } else {
        // User is signed out
        console.log("No user is signed in")
    }
})
