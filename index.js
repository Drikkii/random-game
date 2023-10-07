game();

function game() {
  let animationId = null;
  //   const
  const car = document.querySelector(".car");
  const trees = document.querySelectorAll(".tree");

  // tree animation

  const firstTree = trees[0];
  const speed = 1;
  const cordS = getYCordinates(firstTree);

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

  function getYCordinates(element) {
    const matrix = window.getComputedStyle(element).transform;
    const array = matrix.split(",");
    const y = array[array.length - 1];
    const x = array[array.length - 2];
    const cordinateY = parseFloat(y);
    const cordinateX = parseFloat(x);
    return { y: cordinateY, x: cordinateX };
  }

  // start-game

  animationId = requestAnimationFrame(startGame);

  function startGame() {
    animationTree();

    animationId = requestAnimationFrame(startGame);
  }

  // start-play game button

  const playButton = document.querySelector(".play");
  const playPauseImage = document.querySelector(".play-pause");
  playButton.addEventListener("click", function () {
    if (playPauseImage.src.endsWith("icon/pause.svg")) {
      cancelAnimationFrame(animationId);
      playPauseImage.src = "icon/play.svg";
    } else {
      animationId = requestAnimationFrame(startGame);
      playPauseImage.src = "icon/pause.svg";
    }
  });
}
