import Game, { Cell } from "./game.js";
import View from "./view.js";
import { config } from "./config.js";
import { gardenCollision } from "../data/collision.js";
import { Inventory, Item } from "./interface.js";

export class GardenGame extends Game {
  constructor(interfaceView) {
    super();
    this.interfaceView = interfaceView;

    this.player.location.main = false;
    this.player.location.garden = true;
    this.diggedGroundCells = [];
    this.arrayOfCells = this.createBordersAndMarkers(gardenCollision);
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
    }
  }

  movePlayerDown() {
    game.movePlayerDown();

    if (game.isCollised(this.arrayOfCells.borders, 50, 40, 75, 90)) {
      game.player.position.y -= game.player.speed;
    } else if (game.isCollised(this.arrayOfCells.mark1, 50, 40, 75, 90)) {
      game.player.location.garden = false;
      game.player.location.main = true;
      game.getLocation();
    }
  }

  getPlayerPositionInArray() {
    const groundCells = [];
    const y = Math.trunc(game.player.position.y / 100) - 1;
    let x;

    groundCells.length = 0;

    for (let i = 0; i < this.arrayOfCells.mark5.length; i += 9) {
      //длинна рядка грядки
      groundCells.push(this.arrayOfCells.mark5.slice(i, 9 + i));
    }

    for (let i = 0; i < groundCells[0].length; i++) {
      if (
        game.player.position.x >= (i + 4.5) * Cell.width && //для того чтобы норм рисовалось
        game.player.position.x <= (i + 5.5) * Cell.width
      ) {
        x = i;
      }
    }

    return {
      groundCells: groundCells,
      x: x,
      y: y,
    };
  }

  digGround() {
    const groundCells = this.getPlayerPositionInArray().groundCells;
    const x = this.getPlayerPositionInArray().x;
    const y = this.getPlayerPositionInArray().y;

    if (game.isCollised(groundCells[y], 50, 40, 75, 90) && !groundCells[y][x].isDigged) {
      groundCells[y][x].isDigged = true;
      this.diggedGroundCells.push(groundCells[y][x]);
    }
  }

  plantSeeds(currentPlantType) {
    const groundCells = this.getPlayerPositionInArray().groundCells;
    const x = this.getPlayerPositionInArray().x;
    const y = this.getPlayerPositionInArray().y;
    if (
      game.isCollised(groundCells[y], 50, 40, 75, 90) &&
      groundCells[y][x].isDigged &&
      !groundCells[y][x].isPlanted
    ) {
      groundCells[y][x].isPlanted = true;
      groundCells[y][x].plantType = currentPlantType;
    }
  }

  waterGround() {
    const groundCells = this.getPlayerPositionInArray().groundCells;
    const x = this.getPlayerPositionInArray().x;
    const y = this.getPlayerPositionInArray().y;

    if (game.isCollised(groundCells[y], 50, 40, 75, 90) && groundCells[y][x].isDigged) {
      groundCells[y][x].isWatered = true;
    }
  }

  growPlant() {
    const groundCells = this.getPlayerPositionInArray().groundCells;
    groundCells.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isPlanted && cell.isWatered && cell.growthStage <= 5) {
          cell.growthStage++;
          cell.isWatered = false;
        }
      });
    });
  }

  takePlant() {
    const groundCells = this.getPlayerPositionInArray().groundCells;
    const x = this.getPlayerPositionInArray().x;
    const y = this.getPlayerPositionInArray().y;

    if (game.isCollised(groundCells[y], 50, 40, 75, 90) && groundCells[y][x].growthStage == 5) {
      groundCells[y][x].growthStage = 1;
      groundCells[y][x].isPlanted = false;
      groundCells[y][x].isDigged = false;
      this.diggedGroundCells.splice(this.diggedGroundCells.indexOf(groundCells[y][x]), 1);
      if (groundCells[y][x].plantType == "potato") inventory.getItem(Item.items.potato);
      if (groundCells[y][x].plantType == "tomato") inventory.getItem(Item.items.tomato);
    }
  }
}

export class GardenView extends View {
  constructor(gardenGame) {
    super();
    this.gardenGame = gardenGame;

    this.gardenBackground = new Image();
    this.gardenBackground.src = "./images/garden.png";
    this.gardenForeground = new Image();
    this.gardenForeground.src = "./images/gardenForeground.png";
    this.gardenBed = new Image();
    this.gardenBed.src = "./images/gardenBed.png";
    this.wateredGardenBed = new Image();
    this.wateredGardenBed.src = "./images/wateredGardenBed.png";

    this.potatoSprout1 = new Image();
    this.potatoSprout1.src = "./images/potatoSprout1.png";
    this.potatoSprout2 = new Image();
    this.potatoSprout2.src = "./images/potatoSprout2.png";
    this.potatoSprout3 = new Image();
    this.potatoSprout3.src = "./images/potatoSprout3.png";
    this.potatoSprout4 = new Image();
    this.potatoSprout4.src = "./images/potatoSprout4.png";
    this.potatoSprout5 = new Image();
    this.potatoSprout5.src = "./images/potatoSprout5.png";

    this.tomatoSprout1 = new Image();
    this.tomatoSprout1.src = "./images/tomatoSprout1.png";
    this.tomatoSprout2 = new Image();
    this.tomatoSprout2.src = "./images/tomatoSprout2.png";
    this.tomatoSprout3 = new Image();
    this.tomatoSprout3.src = "./images/tomatoSprout3.png";
    this.tomatoSprout4 = new Image();
    this.tomatoSprout4.src = "./images/tomatoSprout4.png";
    this.tomatoSprout5 = new Image();
    this.tomatoSprout5.src = "./images/tomatoSprout5.png";
  }

  drawField(currentCellsArray) {
    currentCellsArray.forEach((cell) => {
      if (cell.isDigged) {
        this.drawImageWithPosition(
          this.gardenBed,
          cell.position.x - Cell.width * 0.2,
          cell.position.y + Cell.height * 0.1
        );
      }

      if (cell.isWatered) {
        this.drawImageWithPosition(
          this.wateredGardenBed,
          cell.position.x - Cell.width * 0.2,
          cell.position.y + Cell.height * 0.1
        );
      }

      if (cell.isPlanted) {
        let image;
        if (cell.growthStage == 1) {
          if (cell.plantType == "potato") image = this.potatoSprout1;
          if (cell.plantType == "tomato") image = this.tomatoSprout1;
        } else if (cell.growthStage == 2) {
          if (cell.plantType == "potato") image = this.potatoSprout2;
          if (cell.plantType == "tomato") image = this.tomatoSprout2;
        } else if (cell.growthStage == 3) {
          if (cell.plantType == "potato") image = this.potatoSprout3;
          if (cell.plantType == "tomato") image = this.tomatoSprout3;
        } else if (cell.growthStage == 4) {
          if (cell.plantType == "potato") image = this.potatoSprout4;
          if (cell.plantType == "tomato") image = this.tomatoSprout4;
        } else if (cell.growthStage == 5) {
          if (cell.plantType == "potato") image = this.potatoSprout5;
          if (cell.plantType == "tomato") image = this.tomatoSprout5;
        }

        this.drawImageWithPosition(
          image,
          cell.position.x - Cell.width * 0.2,
          cell.position.y + Cell.height * 0.1
        );
      }
    });
  }

  firstDraw() {
    this.gardenBackground.onload = () => {
      this.draw();
    };
  }

  draw() {
    this.clearPlayfield();
    this.drawCanvas();
    this.drawImage(this.gardenBackground);
    this.drawField(this.gardenGame.diggedGroundCells);
    this.drawPlayer();
    this.drawForeground(this.gardenForeground);
    /*this.drawCollision(this.gardenGame.arrayOfCells.borders, config.colors.red);
    this.drawCollision(this.gardenGame.arrayOfCells.mark1, config.colors.blue);
    this.drawCollision(this.gardenGame.arrayOfCells.mark2, config.colors.yellow);
    this.drawCollision(this.gardenGame.arrayOfCells.mark3, config.colors.green);
    this.drawCollision(this.gardenGame.arrayOfCells.mark4, config.colors.pink);
    this.drawCollision(this.gardenGame.arrayOfCells.mark5, config.colors.purple);*/
  }
}
