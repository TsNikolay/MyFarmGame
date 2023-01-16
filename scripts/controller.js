import { config } from "./config.js";
import Game from "./game.js";
import View from "./view.js";

export default class Controller {
  constructor(game, view) {
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
    this.view.drawForeground();
    //this.view.drawCollision(game.arrayOfCells.borders, config.colors.red);
    //this.view.drawCollision(game.arrayOfCells.house, config.colors.blue);
    //this.view.drawCollision(game.arrayOfCells.barn, config.colors.yellow);
    //this.view.drawCollision(game.arrayOfCells.town, config.colors.green);
    //this.view.drawCollision(game.arrayOfCells.garden, config.colors.pink);
  }

  handleKeyboardClick() {
    window.addEventListener("keydown", (event) => {
      config.keys[event.keyCode] = true;
      game.player.isMoving = true;
      Object.keys(config.keys).forEach((key) => {
        if (!config.keys[key]) return;
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
      config.keys[event.keyCode] = false;
      game.player.isMoving = false;
      this.updateView();
    });
  }
}
