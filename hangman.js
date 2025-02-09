import { updateUserPoints } from './update.js';

const hangmanimage = document.querySelector('.hangman-box img');
const worddisplay = document.querySelector('.word-display');
const keyboardDiv = document.querySelector('.keyboard');
const guessesetext = document.querySelector('.gusses-text b');
const gamemodal = document.querySelector('.game-modal');
const playagainbtn = document.querySelector('.play-again');
const final=document.querySelector('.container')

let currentWord, correctletters, wrongguesscount;
const maxguesses = 6;

const resetGame = () => {
    correctletters = [];
    wrongguesscount = 0;
    hangmanimage.src = `images/hangman-${wrongguesscount}.svg`;
    guessesetext.innerText = `${wrongguesscount}/${maxguesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    worddisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    
};
const gameover = (isvictory) => {
    setTimeout(() => {
        if (isvictory) {
            updateUserPoints(10);            
            gamemodal.querySelector("img").src = 'images\\victory.gif';
            gamemodal.querySelector("h4").innerText = 'Congrats!';
            gamemodal.querySelector("p").innerHTML = `You found the word: <b>${currentWord}</b><br>+10 Points!`;
        } else {
            gamemodal.querySelector("img").src = 'images\\lost.gif';
            gamemodal.querySelector("h4").innerText = 'Game Over!';
            gamemodal.querySelector("p").innerHTML = `The correct word is: <b>${currentWord}</b>`;
        }

        gamemodal.style.display = "flex";
        final.style.display = "none";
        document.querySelectorAll(".keyboard button").forEach(button => button.disabled = true);
    }, 300);

    setTimeout(() => {
        window.location.href = "hangman.html";
    }, 5000);
};


const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter && !worddisplay.querySelectorAll('li')[index].classList.contains("guessed")) {
                correctletters.push(letter);
                worddisplay.querySelectorAll('li')[index].innerText = letter;
                worddisplay.querySelectorAll('li')[index].classList.add("guessed");
            }
        });
    } else {
        wrongguesscount++;
        hangmanimage.src = `images/hangman-${wrongguesscount}.svg`;
    }

    button.disabled = true;
    guessesetext.innerText = `${wrongguesscount}/${maxguesses}`;

    if (wrongguesscount >= maxguesses) {
        return gameover(false);
    }

    if ([...new Set(correctletters)].length === new Set(currentWord).size) {
        return gameover(true);
    }
};

for (let i = 97; i <= 122; i++) {  
    let button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => {
        initGame(e.target, String.fromCharCode(i));
    });
}

getRandomWord();

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
const game=document.querySelector(".game")
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
    game.style.display = "none";
});



