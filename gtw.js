import { updateUserPoints } from './update.js';

const inputs = document.querySelector(".inputs");
const resetbtn = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint spam");
const guessleft = document.querySelector(".guess-left spam");
const wrongletter = document.querySelector(".wrong-letter spam");
const final = document.querySelector(".wrapper");
let typing = document.querySelector(".typing-input");
let word, maxguesses, corrects = [], incorrects = [];


function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    maxguesses = 8;
    corrects = [];
    incorrects = [];
    guessleft.innerText = maxguesses;
    wrongletter.innerText = incorrects;
    console.log(word);
    hint.innerText = ranObj.hint;
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(`${key}`) && !corrects.includes(key)) {
        console.log(key);
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxguesses--;
            incorrects.push(`${key}`);
            guessleft.innerText = maxguesses;
        }
        wrongletter.innerText = incorrects;
    }
    typing.value = "";
    setTimeout(() => {
        if (corrects.length === word.length) {
            alert('You Won!');
            updateUserPoints(10);
            randomWord();
        } else if (maxguesses < 1) {
            alert("Game Over!");
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetbtn.addEventListener("click", randomWord);
typing.addEventListener("input", initGame);
document.addEventListener("keydown", () => typing.focus());

document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("loggedInUserId");
    const username = localStorage.getItem("loggedInUsername");
    
    if (userId) {
        const signBtn = document.getElementById("sign-btn");
        signBtn.innerText = username; 
    } else {
        console.log("No user logged in.");
    }
});


const game = document.querySelector(".game");
document.querySelector(".homepage").addEventListener("click", function () {
    window.location.href = "index.html";
});
document.querySelector(".maingame").addEventListener("click", function () {
    final.style.display = "none";
    game.style.display = "flex";
});
document.querySelector(".hang1").addEventListener("click", function () {
    window.location.href = "hangman.html";
    game.style.display = "none";
});
document.querySelector(".guess1").addEventListener("click", function () {
    window.location.href = "gtw.html";
    game.style.display = "none";
});
document.querySelector(".scramble1").addEventListener("click", function () {
    window.location.href = "scramble.html";
    game.style.display = "none";
});
document.querySelector(".leaderboard").addEventListener("click", function () {
        window.location.href = "leader.html";
    });