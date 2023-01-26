import Game, { Cell } from "./game.js";
import View from "./view.js";
import { config } from "./config.js";
import { houseCollision } from "../data/collision.js";
import Interface from "./interface.js";

const modal = document.getElementById("myModal");
const modal2 = document.getElementById("myModal2");
const continueButton = document.getElementsByClassName("continue")[0];
const cutScene = document.querySelector(".cutScene1");
const yesButton = document.getElementsByClassName("Yes")[0];
const noButton = document.getElementsByClassName("No")[0];
const money = document.getElementById("money");

export class HouseGame extends Game {
  constructor(interfaceView) {
    super();
    this.interfaceView = interfaceView;
    this.playerCurrentSprite = new Image();
    this.player.location.main = false;
    this.player.location.house = true;
    this.arrayOfCells = this.createBordersAndMarkers(houseCollision);
  }

  movePlayerLeft() {
    game.movePlayerLeft();

    if (game.isCollised(this.arrayOfCells.borders, 50, 40, 150, 25)) {
      game.player.position.x += game.player.speed;
    }
  }

  movePlayerRight() {
    game.movePlayerRight();

    if (game.isCollised(this.arrayOfCells.borders, 50, 40, 150, 25)) {
      game.player.position.x -= game.player.speed;
    }
  }

  movePlayerUp() {
    game.movePlayerUp();

    if (game.isCollised(this.arrayOfCells.borders, 50, 40, 150, 25)) {
      game.player.position.y += game.player.speed;
    } else if (game.isCollised(this.arrayOfCells.mark2, 50, 40, 150, 25)) {
      modal.style.display = "block";

      yesButton.onclick = () => {
        modal.style.display = "none";
        cutScene.style.display = "block";
        game.player.location.house = false;
        game.player.location.main = false;

        cutScene.play();
        cutScene.onended = () => {
          modal2.style.display = "block";
          cutScene.style.display = "none";
          money.innerHTML = this.interfaceView.showMoneyProfit();

          continueButton.onclick = () => {
            modal2.style.display = "none";
            this.interfaceView.newDay();
            game.player.location.main = true;
            game.getLocation();
          };
        };
      };

      noButton.onclick = function () {
        modal.style.display = "none";
      };
    }
  }

  movePlayerDown() {
    game.movePlayerDown();

    if (game.isCollised(this.arrayOfCells.borders, 50, 40, 150, 25)) {
      game.player.position.y -= game.player.speed;
    } else if (game.isCollised(this.arrayOfCells.mark1, 50, 40, 150, 25)) {
      game.player.location.house = false;
      game.player.location.main = true;
      game.getLocation();
    }
  }
}

export class HouseView extends View {
  constructor(mainGame) {
    super();
    this.houseBackground = new Image();
    this.houseBackground.src = "./images/houseNoFire.png";
    this.mainGame = mainGame;
    this.houseForeground = new Image();
    this.houseForeground.src = "./images/houseForeground.png";
  }

  firstDraw() {
    this.houseBackground.onload = () => {
      this.draw();
    };
  }

  draw() {
    this.clearPlayfield();
    this.drawCanvas();
    this.drawImage(this.houseBackground);
    this.drawPlayer();
    this.drawForeground(this.houseForeground);
    /*this.drawCollision(this.mainGame.arrayOfCells.borders, config.colors.red);
    this.drawCollision(this.mainGame.arrayOfCells.mark1, config.colors.blue);
    this.drawCollision(this.mainGame.arrayOfCells.mark2, config.colors.yellow);
    this.drawCollision(this.mainGame.arrayOfCells.mark3, config.colors.green);
    this.drawCollision(this.mainGame.arrayOfCells.mark4, config.colors.pink);*/
  }
}
