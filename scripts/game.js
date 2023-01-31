import { config } from "./config.js";
import { gardenCollision, houseCollision, mainCollision } from "../data/collision.js";
import View from "./view.js";

export default class Game {
  constructor() {
    this.playerCurrentSprite = new Image();
    this.playerUpSprite = new Image();
    this.playerDownSprite = new Image();
    this.playerLeftSprite = new Image();
    this.playerRightSprite = new Image();
    this.player = this.createPlayer();
  }

  createBordersAndMarkers(arrayOfCollisions) {
    const collisionsArray = [];
    for (let i = 0; i < arrayOfCollisions.length; i += config.rows) {
      collisionsArray.push(arrayOfCollisions.slice(i, config.rows + i));
    }

    const borders = [];
    const mark1 = [];
    const mark2 = [];
    const mark3 = [];
    const mark4 = [];
    const mark5 = [];

    borders.length = 0;
    mark1.length = 0;
    mark2.length = 0;
    mark3.length = 0;
    mark4.length = 0;
    mark5.length = 0;

    collisionsArray.forEach((row, index1) => {
      row.forEach((cell, index2) => {
        const cellForArray = new Cell({
          position: {
            y: index1 * Cell.width,
            x: index2 * Cell.height,
          },
        });
        if (cell === "border") {
          borders.push(cellForArray);
          //houseFromMainLocation, mainLocationFormHouse, mainLocationFormGarden
        } else if (cell === "mark1") {
          mark1.push(cellForArray);
          //barnFromMainLocation, houseFire
        } else if (cell === "mark2") {
          mark2.push(cellForArray);
          //gardenFromMainLocation
        } else if (cell === "mark3") {
          mark3.push(cellForArray);
          //townFromMainLocation
        } else if (cell === "mark4") {
          mark4.push(cellForArray);
          //groundInGarden
        } else if (cell === "mark5") {
          mark5.push(cellForArray);
        }
      });
    });

    return {
      borders: borders,
      mark1: mark1,
      mark2: mark2,
      mark3: mark3,
      mark4: mark4,
      mark5: mark5,
    };
  }

  objectsCollision({ object1, object2 }, leftPad, rightpad, topPad, bottomPad) {
    const object1Sides = {
      left: object1.position.x + leftPad,
      right: object1.position.x + object1.width - rightpad,
      top: object1.position.y + topPad,
      bottom: object1.position.y + object1.height - bottomPad,
    };

    const object2Sides = {
      left: object2.position.x,
      right: object2.position.x + Cell.width,
      top: object2.position.y,
      bottom: object2.position.y + Cell.height,
    };

    function horizontalCollision() {
      return object1Sides.left <= object2Sides.right && object1Sides.right >= object2Sides.left;
    }

    function verticalCollision() {
      return object1Sides.top <= object2Sides.bottom && object1Sides.bottom >= object2Sides.top;
    }

    return horizontalCollision() && verticalCollision();
  }

  isCollised(currentCellsArray, padLeft, padRight, padTop, padBottom) {
    if (!currentCellsArray) return;

    for (let i = 0; i < currentCellsArray.length; i++) {
      const cell = currentCellsArray[i];

      if (
        this.objectsCollision(
          {
            object1: this.player,
            object2: {
              ...cell,
              position: {
                x: cell.position.x + config.paddings.padding12px,
                y: cell.position.y - config.paddings.padding15px,
              },
            },
          },
          padLeft,
          padRight,
          padTop,
          padBottom
        )
      ) {
        return true;
      }
    }
  }

  createPlayer() {
    this.playerCurrentSprite.src = "./images/characterDown1.png";
    this.playerUpSprite.src = "./images/characterUp1.png";
    this.playerDownSprite.src = "./images/characterDown1.png";
    this.playerLeftSprite.src = "./images/characterLeft1.png";
    this.playerRightSprite.src = "./images/characterRight1.png";
    const player = {
      position: {
        x: window.innerWidth / 2 - window.innerWidth / config.rows / 2,
        y: window.innerHeight / 2,
      },

      speed: (window.innerWidth * config.defaultSpeed) / config.defaultCanvasWidth,

      frames: { value: 0, maxValue: 3, scenesAmount: 0 },

      isMoving: false,

      width: this.playerCurrentSprite.width / 3,
      height: this.playerCurrentSprite.height,
      proportionCanvasToPlayerWidth: 17,
      proportionCanvasToPlayerHeight: 6,

      sprites: {
        up: this.playerUpSprite,
        down: this.playerDownSprite,
        left: this.playerLeftSprite,
        right: this.playerRightSprite,
      },

      location: {
        main: true,
        barn: false,
        house: false,
        town: false,
        garden: false,
      },
    };
    return player;
  }

  movePlayerLeft() {
    this.playerCurrentSprite = this.player.sprites.left;
    this.player.position.x -= this.player.speed;
  }

  movePlayerRight() {
    this.playerCurrentSprite = this.player.sprites.right;
    this.player.position.x += this.player.speed;
  }

  movePlayerUp() {
    this.playerCurrentSprite = this.player.sprites.up;
    this.player.position.y -= this.player.speed;
  }

  movePlayerDown() {
    this.playerCurrentSprite = this.player.sprites.down;
    this.player.position.y += this.player.speed;
  }

  setPlayerProperties(propWidth, propHeight, dividerX, dividerY) {
    this.player.proportionCanvasToPlayerWidth = propWidth;
    this.player.proportionCanvasToPlayerHeight = propHeight;
    this.player.position.x = window.innerWidth / dividerX - window.innerWidth / config.rows / 2;
    this.player.position.y = window.innerHeight / dividerY;
  }

  getLocation() {
    if (this.player.location.main) {
      this.setPlayerProperties(17, 6, 2, 2);
    } else if (this.player.location.house) {
      this.setPlayerProperties(13, 4, 2.5, 2);
    } else if (this.player.location.garden) {
      this.setPlayerProperties(17, 6, 2, 2);
    }
  }
}

export class Cell {
  static width = window.innerWidth / config.rows;
  static height = window.innerHeight / config.columns;

  constructor({ position }) {
    this.position = position;
    this.isDigged = false;
    this.isPlanted = false;
    this.isWatered = false;
    this.plantType = null;
    this.growthStage = 4;
  }
}
