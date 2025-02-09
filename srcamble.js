import { updateUserPoints } from './update.js';

const wordtext = document.querySelector(".word"),
    hinttext = document.querySelector(".hint span"),
    time = document.querySelector(".time b"),
    inputfield = document.querySelector("input"),
    refreshbtn = document.querySelector(".refresh-word"),
    checkbtn = document.querySelector(".check-word"),
    final = document.querySelector(".container"),
    game = document.querySelector(".game");

let correctword, timer;
const initTimer = (maxtime) => {
    clearInterval(timer);
    time.innerText = maxtime;

    timer = setInterval(() => {
        if (maxtime > 0) {
            maxtime--;
            time.innerText = maxtime;
        } else {
            clearInterval(timer);
            alert("Time up! Try another word.");
            initGame();
        }
    }, 1000);
};

const initGame = () => {
    if (!words || words.length === 0) {
        console.error("Error: 'words' array is not defined or empty.");
        return;
    }

    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");

    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordtext.innerText = wordArray.join("");
    hinttext.innerText = randomObj.hint;
    correctword = randomObj.word.toLowerCase();

    inputfield.value = "";
    inputfield.setAttribute("maxlength", correctword.length);

    initTimer(30);
};

const checkword = () => {
    let userword = inputfield.value.trim().toLowerCase();

    if (!userword) {
        return alert("Please enter a word!");
    }

    if (correctword !== userword) {
        alert("Wrong answer! Try again.");
        return;
    }

    alert("Correct answer! 🎉");
    updateUserPoints(10);
    clearInterval(timer);
    initGame();
};

initGame();
refreshbtn.addEventListener("click", initGame);
checkbtn.addEventListener("click", checkword);

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
    final.style.display = "none";
    game.style.display = "flex";
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
document.querySelector(".leaderboard").addEventListener("click", function () {
    window.location.href = "leader.html";
    game.style.display = "none";
});