import { config } from "./config.js";
import { mainCollision, houseCollision } from "../data/collision.js";
import Game, { Cell } from "./game.js";

const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

export default class View {
  constructor(game) {
    this.game = game;
  }

  drawCanvas() {
    context.fillStyle = "orange";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawText(text, widthDivider, heightDivider) {
    context.fillStyle = "white";
    context.font = "3vw cursive";
    context.fillText(text, canvas.width / widthDivider, canvas.height / heightDivider);
  }

  drawImage(image) {
    if (!image) return;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

  drawImageWithPosition(image, x, y) {
    if (!image) return;
    context.drawImage(image, x, y, canvas.width, canvas.height);
  }

  drawPlayer() {
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
      canvas.width / game.player.proportionCanvasToPlayerWidth,
      canvas.height / game.player.proportionCanvasToPlayerHeight
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

  drawForeground(foregroungImage) {
    context.drawImage(foregroungImage, 0, 0, canvas.width, canvas.height);
  }

  clearPlayfield() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}
