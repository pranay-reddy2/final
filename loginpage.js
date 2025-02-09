var x=document.getElementById('login')
var y=document.getElementById('sign')
var a=document.getElementById('sign-btn')
const play=document.querySelector(".play")
function sign(){
    x.style.display="None";
    y.style.display="flex";
    console.log("done")
}
function login(){
    x.style.display="flex";
    y.style.display="None";
}
document.addEventListener('keydown',function(e){
    if(e.key==="Escape"){
        x.style.display="None";
        y.style.display="None"; 
    }
})
const game=document.querySelector(".game")
document.querySelector(".homepage").addEventListener("click", function () {
    window.location.href = "index.html";
});
document.querySelector(".maingame").addEventListener("click", function () {
    play.style.display = "none";
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
document.querySelector(".play").addEventListener("click", function () {
    play.style.display = "none";
    game.style.display = "flex";
});

document.querySelector(".leaderboard").addEventListener("click", function () {
    window.location.href = "leader.html";
    game.style.display = "none";
});