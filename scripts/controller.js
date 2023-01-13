import Config from "./config.js";
import Game from "./game.js";
import View from "./view.js";

export default class Controller {
  constructor(game, view) {
    this.config = new Config();
    this.game = game;
    this.view = view;
    this.handleKeyboardClick();
    this.handleKeyboardUp();
  }

  updateView() {
    this.view.clearPlayfield();
    this.view.drawCanvas();
    this.view.drawBackground();
    this.view.drawPlayer();
    // this.view.drawCollision();
  }

  handleKeyboardClick() {
    window.addEventListener("keydown", (event) => {
      this.config.keys[event.keyCode] = true;
      game.player.isMoving = true;
      Object.keys(this.config.keys).forEach((key) => {
        if (!this.config.keys[key]) return;
        if (key == 83) {
          //s
          game.movePlayerDown();
          this.updateView();
        }
        if (key == 68) {
          //d
          game.movePlayerRight();
          this.updateView();
        }
        if (key == 87) {
          //w
          game.movePlayerUp();
          this.updateView();
        }
        if (key == 65) {
          //a
          game.movePlayerLeft();
          this.updateView();
        }
      });
    });
  }

  handleKeyboardUp() {
    window.addEventListener("keyup", (event) => {
      this.config.keys[event.keyCode] = false;
      game.player.isMoving = false;
      this.updateView();
    });
  }
}
