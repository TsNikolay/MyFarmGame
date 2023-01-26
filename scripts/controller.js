import { config } from "./config.js";
import Game, { Cell } from "./game.js";
import View from "./view.js";
import { MainLocationGame, MainLocationView } from "./mainLocation.js";
import { HouseGame, HouseView } from "./house.js";
import { mainCollision, houseCollision } from "../data/collision.js";
import Interface from "./interface.js";

export default class Controller {
  constructor(game, view, interfaceView, inventory, mainGame, mainView, houseGame, houseView) {
    this.game = game;
    this.view = view;
    this.interfaceView = interfaceView;
    this.inventory = inventory;
    this.mainGame = mainGame;
    this.mainView = mainView;
    this.houseGame = houseGame;
    this.houseView = houseView;

    this.handleKeyboardClick();
    this.handleKeyboardUp();
    this.updateAsync();
    this.handleScroll();
    this.handleLeftButtonDown();
  }

  updateAsync() {
    let updater = setInterval(() => {
      this.interfaceView.draw();
    }, 500);

    if (this.interfaceView.hours == 24) {
      clearInterval(updater);
    }
  }

  updateView() {
    if (this.inventory.isEditing) return;

    if (this.game.player.location.main) {
      this.mainView.draw();
    } else if (this.game.player.location.house) {
      this.houseView.draw();
    }
    this.interfaceView.draw();
    this.inventory.draw();
  }

  handleKeyboardClick() {
    window.addEventListener("keydown", (event) => {
      config.keys[event.keyCode] = true;
      game.player.isMoving = true;
      Object.keys(config.keys).forEach((key) => {
        if (!config.keys[key]) return;

        if (key == 83) {
          //s
          if (this.game.player.location.main) {
            this.mainGame.movePlayerDown();
          } else if (this.game.player.location.house) {
            this.houseGame.movePlayerDown();
          }
          this.updateView();
        }
        if (key == 68) {
          //d
          if (this.game.player.location.main) {
            this.mainGame.movePlayerRight();
          } else if (this.game.player.location.house) {
            this.houseGame.movePlayerRight();
          }
          this.updateView();
        }
        if (key == 87) {
          //w
          if (this.game.player.location.main) {
            this.mainGame.movePlayerUp();
          } else if (this.game.player.location.house) {
            this.houseGame.movePlayerUp();
          }
          this.updateView();
        }
        if (key == 65) {
          //a
          if (this.game.player.location.main) {
            this.mainGame.movePlayerLeft();
          } else if (this.game.player.location.house) {
            this.houseGame.movePlayerLeft();
          }
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

  handleScroll() {
    window.addEventListener("wheel", (event) => {
      this.inventory.scrollInventory(event);
      this.updateView();
    });
  }

  handleLeftButtonDown() {
    window.addEventListener("click", (event) => {
      if (this.inventory.isEditing == false) {
        this.inventory.moveItemTake(event);
      } else {
        this.inventory.moveItemDrop(event);
        this.updateView();
      }
    });
  }
}
