const nickname = document.querySelector(".nickname");
const start = document.querySelector(".start");
const startMenu = document.querySelector(".start-menu");
const younick = document.querySelector(".you-nick");
const form = document.querySelector(".form");

start.addEventListener("click", function () {
  PlayGame();
});

function PlayGame() {
  if (nickname.value == "") {
    younick.style.display = "initial";
  } else {
    form.action = "game.html";
  }
}
