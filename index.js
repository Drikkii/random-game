const nickname = document.querySelector(".nickname");
const start = document.querySelector(".start");
const startMenu = document.querySelector(".start-menu");
const younick = document.querySelector(".you-nick");
const form = document.querySelector(".form");
const nikePlayer = document.querySelector(".nikePlayer");

start.addEventListener("click", function () {
  let inputValue = document.querySelector("input").value;

  // Сохраняем значение в localStorage
  localStorage.setItem("savedInput", inputValue);

  let savedNicknames = JSON.parse(localStorage.getItem("savedNicknames")) || [];

  savedNicknames.unshift(inputValue);

  if (savedNicknames.length > 10) {
    savedNicknames.pop();
  }

  localStorage.setItem("savedNicknames", JSON.stringify(savedNicknames));
  playSound("sound/pause.mp3");
  PlayGame();
});

function PlayGame() {
  if (nickname.value == "") {
    younick.style.display = "initial";
  } else {
    form.action = "game.html";
  }
}

function playSound(sound) {
  let song = document.getElementById(sound);
  song.volume = 1;

  song.play();
}
function playSound(url) {
  let s = new Audio();
  s.src = url;
  s.play();
}
