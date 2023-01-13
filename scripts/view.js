import Game, { Boundary } from "./game.js";

const canvas = document.querySelector("canvas");
const windowInnerWidth = window.innerWidth;
const windowInnerHeight = window.innerHeight;
canvas.width = windowInnerWidth;
canvas.height = windowInnerHeight;
const context = canvas.getContext("2d");

export default class View {
  constructor() {
    this.game = new Game();
    this.image = new Image();
    this.image.src = "../images/Map.png";
    this.draw();
  }

  drawCanvas() {
    context.fillStyle = "orange";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawBackground() {
    context.drawImage(this.image, 0, 0, canvas.width, canvas.height);
  }

  drawPlayer() {
    if (!game.player.isMoving) {
      game.player.frames.val = 1; //если стоит то чтобы был стоячий спрайт
    }

    context.drawImage(
      game.playerCurrentImage,
      game.player.frames.val * game.player.width,
      0,
      game.playerDownImage.width / 3, // чтобы показать токо первую модельку из трёх
      game.playerDownImage.height,
      game.player.position.x,
      game.player.position.y,
      canvas.width / 12, //пропорция канваса к персу
      canvas.height / 6 //пропорция канваса к персу
    );

    game.player.frames.scenesAmount++;

    if (game.player.frames.scenesAmount % 5 === 0) {
      if (game.player.frames.val < game.player.frames.max - 1) {
        game.player.frames.val++;
      } else {
        game.player.frames.val = 0;
      }
    }
  }

  drawCollision() {
    for (let i = 0; i < game.createCollision().length; i++) {
      context.fillStyle = "red";
      context.fillRect(
        game.createCollision()[i].position.y - 15,
        game.createCollision()[i].position.x + 12,
        Boundary.width,
        Boundary.height
      );
    }
  }

  clearPlayfield() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  draw() {
    this.image.onload = () => {
      this.drawCanvas();
      this.drawBackground();
      this.drawPlayer();
      // this.drawCollision();
    };
  }

  animate() {
    window.requestAnimationFrame(animate);
    console.log("animate");
  }
}
