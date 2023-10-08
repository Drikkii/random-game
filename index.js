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

  // car animation (keydown keyup keypress)

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
    if (newX - carWidth < (roadWidthBox * -1) / 1.65) {
      return;
    }
    carCordinat.x = newX;
    carMovement(newX, carCordinat.y);
    carMove.left = requestAnimationFrame(carMoveLeft);
  }
  function carMoveRight() {
    const newX = carCordinat.x + 3;
    if (newX + carWidth > roadWidthBox / 1.8) {
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

  const speed = 5;

  const CordsAllTrees = [];

  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    const cordS = getYCordinates(tree);
    CordsAllTrees.push(cordS); //добавляем в массив
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
  let roadbcdCor = { y: 0 }; // Изначально позиция дороги вверху
  let roadbcdCor2 = { y: -roadHeight2 }; // Изначально позиция дороги вверху

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
      roadbcdCor2.y = -roadHeight2; // Сразу переместить дорогу наверх после достижения нижней границы
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
  console.log(yamaCord);

  const yamaWight = danger.clientWidth;

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

  // Пример использования:

  // start-game

  animationId = requestAnimationFrame(startGame);

  function startGame() {
    animationTree();
    roadAnimation();
    roadAnimation2();
    coinAnimation();
    yamaAnimation();

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
    } else {
      animationId = requestAnimationFrame(startGame);
      playPauseImage.src = "icon/pause.svg";
    }
  });
}
