import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyAaMUo-McxUjpZxiMx62nB9H_6CC3qvTIo",
    authDomain: "first-67735.firebaseapp.com",
    projectId: "first-67735",
    storageBucket: "first-67735.appspot.com",
    messagingSenderId: "319644668093",
    appId: "1:319644668093:web:01af25786b6dee2243e7d4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(); 
const game=document.querySelector(".game");
const h1=document.querySelector("h1");
const leaderboardTable = document.querySelector(".leaderboard");
const loadLeaderboard = async () => {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    
    let users = [];
    snapshot.forEach(doc => {
        const data = doc.data();
        users.push({ name: data.username, score: data.points || 0 });
    });
    
    users.sort((a, b) => b.score - a.score);
    
    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${index + 1}</td><td>${user.name}</td><td>${user.score}</td>`;
        leaderboardTable.appendChild(row);
    });
};

document.addEventListener("DOMContentLoaded", loadLeaderboard);
document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("loggedInUserId") || "";
    const username = localStorage.getItem("loggedInUsername") || "Sign in";
    
    const signBtn = document.getElementById("sign-btn");
    signBtn.innerText = username;
});

document.querySelector(".homepage").addEventListener("click", () => {
    window.location.href = "index.html";
});

document.querySelector(".maingame").addEventListener("click", () => {
    leaderboardTable.style.display="none";
    game.style.display = "flex";
    h1.style.display="none"
});

document.querySelector(".hang1").addEventListener("click", () => {
    window.location.href = "hangman.html";
});

document.querySelector(".guess1").addEventListener("click", () => {
    window.location.href = "gtw.html";
});

document.querySelector(".scramble1").addEventListener("click", () => {
    window.location.href = "scramble.html";
});
