game();
function game() {
  let animationId = null;
  //   const
  const car = document.querySelector(".car");
  const trees = document.querySelectorAll(".tree");
  const road = document.querySelector(".road-map");
  const road2 = document.querySelector(".road-map2");
  const roadbox = document.querySelector(".road");
  const cash = document.querySelector(".cash");
  const danger = document.querySelector(".danger");
  const score = document.querySelector(".score-game");
  const backdoor = document.querySelector(".backdoor");
  const finishMenu = document.querySelector(".finish-menu");
  const finishScore = document.querySelector(".score-finish");
  const newStart = document.querySelector(".new-start");
  const audio = document.querySelector(".audio");

  // car animation (keydown keyup keypress)

  let isPlay = false;

  const carWidth = car.clientWidth;
  const carHeight = car.clientHeight;
  const roadHeightBox = roadbox.clientHeight;
  const roadWidthBox = roadbox.clientWidth;
  const carCordinat = getYCordinates(car);
  const carMove = { top: null, bottom: null, left: null, right: null };

  document.addEventListener("keydown", (event) => {
    if (playPauseImage.src.endsWith("icon/play.svg")) {
      return;
    }

    const code = event.code;
    if ((code === "ArrowUp" || code === "KeyW") && carMove.top === null) {
      carMove.top = requestAnimationFrame(carMoveUp);
    } else if (
      (code === "ArrowDown" || code === "KeyS") &&
      carMove.bottom === null
    ) {
      carMove.bottom = requestAnimationFrame(carMoveDown);
    } else if (
      (code === "ArrowLeft" || code === "KeyA") &&
      carMove.left === null
    ) {
      carMove.left = requestAnimationFrame(carMoveLeft);
    } else if (
      (code === "ArrowRight" || code === "KeyD") &&
      carMove.right === null
    ) {
      carMove.right = requestAnimationFrame(carMoveRight);
    }
  });
  document.addEventListener("keyup", (event) => {
    const code = event.code;
    if (code === "ArrowUp" || code === "KeyW") {
      cancelAnimationFrame(carMove.top);
      carMove.top = null;
    } else if (code === "ArrowDown" || code === "KeyS") {
      cancelAnimationFrame(carMove.bottom);
      carMove.bottom = null;
    } else if (code === "ArrowLeft" || code === "KeyA") {
      cancelAnimationFrame(carMove.left);
      carMove.left = null;
    } else if (code === "ArrowRight" || code === "KeyD") {
      cancelAnimationFrame(carMove.right);
      carMove.right = null;
    }
  });

  function carMoveUp() {
    const newY = carCordinat.y - 3;
    if (newY < 0) {
      return;
    }
    carCordinat.y = newY;
    carMovement(carCordinat.x, newY);
    carMove.top = requestAnimationFrame(carMoveUp);
  }
  function carMoveDown() {
    const newY = carCordinat.y + 3;
    if (newY + carHeight > roadHeightBox) {
      return;
    }
    carCordinat.y = newY;
    carMovement(carCordinat.x, newY);
    carMove.bottom = requestAnimationFrame(carMoveDown);
  }
  function carMoveLeft() {
    const newX = carCordinat.x - 3;
    if (newX - carWidth < (roadWidthBox * -1) / 6) {
      return;
    }
    carCordinat.x = newX;
    carMovement(newX, carCordinat.y);
    carMove.left = requestAnimationFrame(carMoveLeft);
  }
  function carMoveRight() {
    const newX = carCordinat.x + 3;
    if (newX + carWidth > roadWidthBox) {
      return;
    }
    carCordinat.x = newX;
    carMovement(newX, carCordinat.y);
    carMove.right = requestAnimationFrame(carMoveRight);
  }

  function carMovement(x, y) {
    car.style.transform = `translate(${x}px, ${y}px)`;
  }

  // tree / road animation

  let speed = 1.5;

  const CordsAllTrees = [];

  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const cordS = getYCordinates(tree);
    CordsAllTrees.push(cordS);
  }

  function animationTree() {
    for (let i = 0; i < trees.length; i++) {
      const tree = trees[i];
      const cordS = CordsAllTrees[i];

      let newCordinatey = cordS.y + speed;
      if (newCordinatey > window.innerHeight) {
        newCordinatey = -tree.height;
      }

      cordS.y = newCordinatey;
      tree.style.transform = `translate(${cordS.x}px, ${newCordinatey}px)`;
    }
  }
  const roadHeight = road.clientHeight;
  const roadHeight2 = road2.clientHeight;
  let roadbcdCor = { y: 0 };
  let roadbcdCor2 = { y: -roadHeight2 };

  function roadAnimation() {
    let newCoordinateY = roadbcdCor.y + speed;

    if (newCoordinateY > window.innerHeight) {
      newCoordinateY = -roadHeight;
    }
    roadbcdCor.y = newCoordinateY;
    road.style.transform = `translateY(${roadbcdCor.y}px)`;
  }
  function roadAnimation2() {
    let newCoordinateY2 = roadbcdCor2.y + speed;

    if (newCoordinateY2 > window.innerHeight) {
      roadbcdCor2.y = -roadHeight2;
    } else {
      roadbcdCor2.y = newCoordinateY2;
    }

    road2.style.transform = `translateY(${roadbcdCor2.y}px)`;
  }

  function getYCordinates(element) {
    const matrix = window.getComputedStyle(element).transform;
    const array = matrix.split(",");
    const y = array[array.length - 1];
    const x = array[array.length - 2];
    const cordinateY = parseFloat(y);
    const cordinateX = parseFloat(x);
    return { y: cordinateY, x: cordinateX };
  }

  // coint / yama animation and generate
  const coinCord = getYCordinates(cash);

  const coinWight = cash.clientWidth;

  function coinAnimation() {
    let newCordinateyY = coinCord.y + speed;
    let newCordinateyX = coinCord.x;
    if (newCordinateyY > window.innerHeight) {
      newCordinateyY = -1000;
      const direction = parseInt(Math.random() * 2);
      const randomXCord = parseInt(
        Math.random() * (roadWidthBox - coinWight) + 1
      );
      cash.style.display = "initial";
      cash.visible = true;
      if (direction === 0) {
        newCordinateyX = randomXCord;
      } else if (direction === 1) {
        newCordinateyX = randomXCord;
      }
    }

    coinCord.y = newCordinateyY;
    coinCord.x = newCordinateyX;
    cash.style.transform = `translate(${newCordinateyX}px, ${newCordinateyY}px)`;
  }
  const yamaCord = getYCordinates(danger);

  const yamaWight = danger.clientWidth;
  const yamaHeight = danger.clientHeight;

  function yamaAnimation() {
    let newCordinateyY = yamaCord.y + speed;
    let newCordinateyX = yamaCord.x;
    if (newCordinateyY > window.innerHeight) {
      newCordinateyY = -700;
      const direction = parseInt(Math.random() * 2);
      const randomXCord = parseInt(
        Math.random() * (roadWidthBox - yamaWight) + 1
      );
      if (direction === 0) {
        newCordinateyX = randomXCord;
      } else if (direction === 1) {
        newCordinateyX = randomXCord;
      }
    }

    yamaCord.y = newCordinateyY;
    yamaCord.x = newCordinateyX;
    danger.style.transform = `translate(${newCordinateyX}px, ${newCordinateyY}px)`;
  }

  let gameScore = 0;
  //  colizzion Cash
  function cashCollision() {
    const carYTop = carCordinat.y;
    const carYBottom = carCordinat.y + carHeight;

    const carXLeft = carCordinat.x;
    const carXRight = carCordinat.x;

    const cashYTop = coinCord.y;
    const cashYBottom = coinCord.y + coinWight;

    const cashXLeft = coinCord.x - coinWight;
    const cashXRight = coinCord.x + coinWight;

    //  Прописываем коллизию для Y

    if (carYTop > cashYBottom && cash.visible === true) {
      return false;
    }

    if (carYBottom < cashYTop && cash.visible === true) {
      return false;
    }

    // Прописываем коллизию для X
    if (carXLeft > cashXRight && cash.visible === true) {
      return false;
    }
    if (carXRight < cashXLeft && cash.visible === true) {
      return false;
    }
    playSoundS("sound/cashSound.mp3");
    return true;
  }
  //  colizzion yama
  function yamaCollision() {
    const carYTop = carCordinat.y;
    const carYBottom = carCordinat.y + carHeight;

    const carXLeft = carCordinat.x;
    const carXRight = carCordinat.x;

    const dangerYTop = yamaCord.y;
    const dangerYBottom = yamaCord.y + yamaHeight;

    const dangerXLeft = yamaCord.x - yamaWight / 2;
    const dangerXRight = yamaCord.x + yamaWight;
    //  Прописываем коллизию для Y

    if (carYTop > dangerYBottom) {
      return false;
    }

    if (carYBottom < dangerYTop) {
      return false;
    }

    // Прописываем коллизию для X
    if (carXLeft > dangerXRight) {
      return false;
    }
    if (carXRight < dangerXLeft) {
      return false;
    }
    playSoundS("sound/crash.mp3");
    return true;
  }

  // start-game

  animationId = requestAnimationFrame(startGame);

  function startGame() {
    if (yamaCollision()) {
      return finishGame();
    }

    animationTree();
    roadAnimation();
    roadAnimation2();
    coinAnimation();
    yamaAnimation();
    if (cash.visible === true && cashCollision()) {
      gameScore++;
      score.innerText = gameScore;
      cash.style.display = "none";
      cash.visible = false;
    }

    if (gameScore > 2) {
      speed = 2;
    }
    if (gameScore > 8) {
      speed = 3;
    }
    if (gameScore > 12) {
      speed = 4;
    }
    if (gameScore > 16) {
      speed = 5;
    }
    if (gameScore > 25) {
      speed = 6;
    }
    if (gameScore > 33) {
      speed = 7;
    }
    if (gameScore > 40) {
      speed = 8;
    }

    animationId = requestAnimationFrame(startGame);
  }

  // start-play game button

  const playButton = document.querySelector(".play");
  const playPauseImage = document.querySelector(".play-pause");
  playButton.addEventListener("click", function () {
    if (playPauseImage.src.endsWith("icon/pause.svg")) {
      cancelAnimationFrame(animationId);
      cancelAnimationFrame(carMove.top);
      cancelAnimationFrame(carMove.bottom);
      cancelAnimationFrame(carMove.left);
      cancelAnimationFrame(carMove.right);

      playPauseImage.src = "icon/play.svg";
      playSound();
    } else {
      animationId = requestAnimationFrame(startGame);
      playPauseImage.src = "icon/pause.svg";
      playSound();
    }
  });
  function finishGame() {
    cancelAnimationFrame(animationId);
    cancelAnimationFrame(carMove.top);
    cancelAnimationFrame(carMove.bottom);
    cancelAnimationFrame(carMove.left);
    cancelAnimationFrame(carMove.right);
    backdoor.style.display = "initial";
    finishMenu.style.display = "initial";
    playPauseImage.src = "icon/play.svg";
    finishScore.innerText = gameScore;
    playSound();

    let finishScoreS = gameScore;

    localStorage.setItem("savedScr", finishScoreS);

    let savedScore = JSON.parse(localStorage.getItem("savedScore")) || [];

    savedScore.unshift(finishScoreS);

    if (savedScore.length > 10) {
      savedScore.pop();
    }

    localStorage.setItem("savedScore", JSON.stringify(savedScore));

    stopSound("sound/carSound.mp3");
  }

  newStart.addEventListener("click", function () {
    window.location.reload();
  });

  // local

  // Score
  let savedscores = JSON.parse(localStorage.getItem("savedScore")) || [];
  let saveNick = localStorage.getItem("savedInput");
  console.log(saveNick);

  let scoreContainer = document.querySelector(".scoreGame");

  scoreContainer.innerHTML = "";

  for (let i = 0; i < savedscores.length; i++) {
    let Score = savedscores[i];

    let scoreElement = document.createElement("div");
    scoreElement.textContent = saveNick + "  " + ":" + "  " + Score;

    scoreContainer.appendChild(scoreElement);
  }

  // sound

  function playSound() {
    let s = audio;
    s.volume = 1;

    if (s.paused) {
      s.play();
    } else {
      s.pause();
      audioElement.currentTime = 0;
    }
  }

  function playSoundS(url) {
    let audio = new Audio();
    audio.src = url;
    audio.play();
  }
  playSound();
}
