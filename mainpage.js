import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyAaMUo-McxUjpZxiMx62nB9H_6CC3qvTIo",
    authDomain: "first-67735.firebaseapp.com",
    projectId: "first-67735",
    storageBucket: "first-67735.firebasestorage.app",
    messagingSenderId: "319644668093",
    appId: "1:319644668093:web:01af25786b6dee2243e7d4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

function showmessage(message, divid) {
    var messagediv = document.getElementById(divid);
    messagediv.style.display = "block";
    messagediv.innerHTML = message; 
    messagediv.style.opacity = 1;
    setTimeout(() => {
        messagediv.style.opacity = 0;
    }, 5000);
}

const signbtn = document.getElementById('signin-btn');
const sigbtn = document.getElementById('sign-btn');
var x=document.getElementById('login')
var y=document.getElementById('sign')
signbtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('signemail').value;
    const password = document.getElementById('signpassword').value;
    const confirmpassword = document.getElementById('signconfirmpassword').value;
    const username = document.getElementById('signname').value;
    let points=0;

    if (password !== confirmpassword) {
        showmessage("Passwords do not match!", "signupmessage");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = { email, username, points };
        await setDoc(doc(db, "users", user.uid), userData);

        showmessage("Account created successfully!", "signupmessage");
        sigbtn.innerText = username;

        setTimeout(() => {
            x.style.display="None";
            y.style.display="None"; 
        }, 2000);
    } catch (error) {
        console.error("Error:", error);
        if (error.code === 'auth/email-already-in-use') {
            showmessage('Email address already exists!', 'signupmessage');
        } else {
            showmessage('Unable to create account', 'signupmessage');
        }
    }
});

const submit = document.getElementById('submit');
submit.addEventListener('click', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('signinemail').value;
    const password = document.getElementById('signinpassword').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const username = userDoc.exists() ? userDoc.data().username : "User";

        localStorage.setItem("loggedInUserId", user.uid);
        localStorage.setItem("loggedInUsername", username);

        showmessage('Login is successful', 'signinmessage');
        sigbtn.innerHTML = username;

        setTimeout(() => {
            x.style.display="None";
            y.style.display="None"; 
        }, 1000);
    } catch (error) {
        console.error("Login Error:", error);
        showmessage('Incorrect Email or Password', 'signinmessage');
    }
});

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence enabled: User stays logged in across pages.");
  })
  .catch((error) => {
    console.error("Persistence error:", error);
  });

