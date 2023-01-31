import Game, { Cell } from "./game.js";
import View from "./view.js";
import { config } from "./config.js";
import { mainCollision } from "../data/collision.js";

export class MainLocationGame extends Game {
  constructor() {
    super();
    this.playerCurrentSprite = new Image();
    this.player.location.main = true;
    this.player.location.house = false;
    this.player.location.barn = false;
    this.player.location.town = false;
    this.arrayOfCells = this.createBordersAndMarkers(mainCollision);
  }

  movePlayerLeft() {
    game.movePlayerLeft();

    if (game.isCollised(this.arrayOfCells.borders, 50, 40, 75, 90)) {
      game.player.position.x += game.player.speed;
    }
  }

  movePlayerRight() {
    game.movePlayerRight();

    if (game.isCollised(this.arrayOfCells.borders, 50, 40, 75, 90)) {
      game.player.position.x -= game.player.speed;
    }
  }

  movePlayerUp() {
    game.movePlayerUp();

    if (game.isCollised(this.arrayOfCells.borders, 50, 40, 75, 90)) {
      game.player.position.y += game.player.speed;
    } else if (game.isCollised(this.arrayOfCells.mark1, 50, 40, 75, 90)) {
      game.player.location.house = true;
      game.player.location.main = false;
      game.getLocation();
    } else if (game.isCollised(this.arrayOfCells.mark3, 50, 40, 75, 90)) {
      game.player.location.garden = true;
      game.player.location.main = false;
      game.getLocation();
    }
  }

  movePlayerDown() {
    game.movePlayerDown();

    if (game.isCollised(this.arrayOfCells.borders, 50, 40, 75, 90)) {
      game.player.position.y -= game.player.speed;
    }
  }
}

export class MainLocationView extends View {
  constructor(mainGame) {
    super();
    this.mainGame = mainGame;
    this.image = new Image();
    this.image.src = "./images/Map.png";
    this.foregroundImage = new Image();
    this.foregroundImage.src = "./images/back.png";
    this.firstDraw();
  }

  firstDraw() {
    this.image.onload = () => {
      this.draw();
    };
  }

  draw() {
    this.clearPlayfield();
    this.drawCanvas();
    this.drawImage(this.image);
    this.drawPlayer();
    this.drawForeground(this.foregroundImage);
    /* this.drawCollision(this.mainGame.arrayOfCells.borders, config.colors.red);
    this.drawCollision(this.mainGame.arrayOfCells.mark1, config.colors.blue);
    this.drawCollision(this.mainGame.arrayOfCells.mark2, config.colors.yellow);
    this.drawCollision(this.mainGame.arrayOfCells.mark3, config.colors.green);
    this.drawCollision(this.mainGame.arrayOfCells.mark4, config.colors.pink); */
  }
}
