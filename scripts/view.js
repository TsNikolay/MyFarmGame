import { config } from "./config.js";
import Game, { Cell } from "./game.js";

const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

export default class View {
  constructor() {
    this.image = new Image();
    this.image.src = "../images/Map.png";
    this.foregroundImage = new Image();
    this.foregroundImage.src = "../images/back.png";
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
    const proportionCanvasToPlayerWidth = 17;
    const proportionCanvasToPlayerHeight = 6;
    const sprittesAmountOnImage = 3;
    const spriteUpdateFrequency = 5;
    const frames = game.player.frames;

    if (!game.player.isMoving) {
      frames.value = 1;
    }

    context.drawImage(
      game.playerCurrentSprite,
      frames.value * game.player.width,
      0,
      game.playerCurrentSprite.width / sprittesAmountOnImage,
      game.playerCurrentSprite.height,
      game.player.position.x,
      game.player.position.y,
      canvas.width / proportionCanvasToPlayerWidth,
      canvas.height / proportionCanvasToPlayerHeight
    );

    frames.scenesAmount++;

    if (frames.scenesAmount % spriteUpdateFrequency === 0) {
      if (frames.value < frames.maxValue - 1) {
        frames.value++;
      } else {
        frames.value = 0;
      }
    }
  }

  drawCollision(currentCellsArray, color) {
    currentCellsArray.forEach((cell) => {
      context.fillStyle = color;
      context.fillRect(
        cell.position.x - config.paddings.padding15px,
        cell.position.y + config.paddings.padding12px,
        Cell.width,
        Cell.height
      );
    });
  }

  drawForeground() {
    context.drawImage(this.foregroundImage, 0, 0, canvas.width, canvas.height);
  }

  clearPlayfield() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  draw() {
    this.image.onload = () => {
      this.drawCanvas();
      this.drawBackground();
      this.drawPlayer();
      this.drawForeground();
      //this.drawCollision(game.arrayOfCells.borders, config.colors.red);
      //this.drawCollision(game.arrayOfCells.house, config.colors.blue);
      //this.drawCollision(game.arrayOfCells.barn, config.colors.yellow);
      //this.drawCollision(game.arrayOfCells.town, config.colors.green);
      //this.drawCollision(game.arrayOfCells.garden, config.colors.pink);
    };
  }

  animate() {
    window.requestAnimationFrame(animate);
    console.log("animate");
  }
}
