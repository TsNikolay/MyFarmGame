import { config } from "./config.js";
import { collision } from "../data/collision.js";

export default class Game {
  constructor() {
    this.playerCurrentSprite = new Image();
    this.playerUpSprite = new Image();
    this.playerDownSprite = new Image();
    this.playerLeftSprite = new Image();
    this.playerRightSprite = new Image();
    //this.playfield = this.createPlayfield();
    this.player = this.createPlayer();
    this.arrayOfCells = this.createBordersAndMarkers();
  }

  createBordersAndMarkers() {
    const collisionsArray = [];
    for (let i = 0; i < collision.length; i += config.rows) {
      collisionsArray.push(collision.slice(i, config.rows + i));
    }

    const borders = [];
    const house = [];
    const barn = [];
    const town = [];
    const garden = [];

    collisionsArray.forEach((row, index1) => {
      row.forEach((cell, index2) => {
        if (cell === "border") {
          borders.push(
            new Cell({
              position: {
                y: index1 * Cell.width,
                x: index2 * Cell.height,
              },
            })
          );
        } else if (cell === "house") {
          house.push(
            new Cell({
              position: {
                y: index1 * Cell.width,
                x: index2 * Cell.height,
              },
            })
          );
        } else if (cell === "barn") {
          barn.push(
            new Cell({
              position: {
                y: index1 * Cell.width,
                x: index2 * Cell.height,
              },
            })
          );
        } else if (cell === "town") {
          town.push(
            new Cell({
              position: {
                y: index1 * Cell.width,
                x: index2 * Cell.height,
              },
            })
          );
        } else if (cell === "garden") {
          garden.push(
            new Cell({
              position: {
                y: index1 * Cell.width,
                x: index2 * Cell.height,
              },
            })
          );
        }
      });
    });

    return {
      borders: borders,
      house: house,
      barn: barn,
      town: town,
      garden: garden,
    };
  }

  objectsCollision({ object1, object2 }) {
    const object1Sides = {
      left: object1.position.x + config.paddings.padding50px,
      right: object1.position.x + object1.width - config.paddings.padding40px,
      top: object1.position.y + config.paddings.padding75px,
      bottom: object1.position.y + object1.height - config.paddings.padding90px,
    };

    const object2Sides = {
      left: object2.position.x,
      right: object2.position.x + Cell.width,
      top: object2.position.y,
      bottom: object2.position.y + Cell.height,
    };

    function horizontalCollision() {
      return (
        object1Sides.left <= object2Sides.right &&
        object1Sides.right >= object2Sides.left
      );
    }

    function verticalCollision() {
      return (
        object1Sides.top <= object2Sides.bottom &&
        object1Sides.bottom >= object2Sides.top
      );
    }

    return horizontalCollision() && verticalCollision();
  }

  isCollised(currentCellsArray) {
    for (let i = 0; i < currentCellsArray.length; i++) {
      const cell = currentCellsArray[i];

      if (
        this.objectsCollision({
          object1: this.player,
          object2: {
            ...cell,
            position: {
              x: cell.position.x + config.paddings.padding12px,
              y: cell.position.y - config.paddings.padding15px,
            },
          },
        })
      ) {
        return true;
      }
    }
  }

  /* createPlayfield() {
    const playfield = [];

    playfield.forEach((rows) => {
      rows.forEach((cell) => {
        cell = 0;
      });
    });

    return playfield;
  } */

  createPlayer() {
    this.playerCurrentSprite.src = './images/characterDown1.png';
    this.playerUpSprite.src = './images/characterUp1.png';
    this.playerDownSprite.src = './images/characterDown1.png';
    this.playerLeftSprite.src = './images/characterLeft1.png';
    this.playerRightSprite.src = './images/characterRight1.png';

    const player = {
      position: {
        x: window.innerWidth / 2 - window.innerWidth / config.rows / 2,
        y: window.innerHeight / 2,
      },

      speed:
        (window.innerWidth * config.defaultSpeed) / config.defaultCanvasWidth,
      frames: { ...frames, value: 0, maxValue: 3, scenesAmount: 0 },
      isMoving: false,

      width: this.playerDownSprite.width / 3,
      height: this.playerDownSprite.height,

      sprites: {
        up: this.playerUpSprite,
        down: this.playerDownSprite,
        left: this.playerLeftSprite,
        right: this.playerRightSprite,
      },
    };
    return player;
  }

  movePlayerLeft() {
    this.playerCurrentSprite = this.player.sprites.left;
    this.player.position.x -= this.player.speed;
    if (this.isCollised(this.arrayOfCells.borders)) {
      this.player.position.x += this.player.speed;
    } else if (this.isCollised(this.arrayOfCells.house)) {
      console.log("House");
    } else if (this.isCollised(this.arrayOfCells.barn)) {
      console.log("Barn");
    } else if (this.isCollised(this.arrayOfCells.town)) {
      console.log("Town");
    } else if (this.isCollised(this.arrayOfCells.garden)) {
      console.log("Garden");
    }
  }

  movePlayerRight() {
    this.playerCurrentSprite = this.player.sprites.right;
    this.player.position.x += this.player.speed;
    if (this.isCollised(this.arrayOfCells.borders)) {
      this.player.position.x -= this.player.speed;
    } else if (this.isCollised(this.arrayOfCells.house)) {
      console.log("House");
    } else if (this.isCollised(this.arrayOfCells.barn)) {
      console.log("Barn");
    } else if (this.isCollised(this.arrayOfCells.town)) {
      console.log("Town");
    } else if (this.isCollised(this.arrayOfCells.garden)) {
      console.log("Garden");
    }
  }

  movePlayerUp() {
    this.playerCurrentSprite = this.player.sprites.up;
    this.player.position.y -= this.player.speed;
    if (this.isCollised(this.arrayOfCells.borders)) {
      this.player.position.y += this.player.speed;
    } else if (this.isCollised(this.arrayOfCells.house)) {
      console.log("House");
    } else if (this.isCollised(this.arrayOfCells.barn)) {
      console.log("Barn");
    } else if (this.isCollised(this.arrayOfCells.town)) {
      console.log("Town");
    } else if (this.isCollised(this.arrayOfCells.garden)) {
      console.log("Garden");
    }
  }

  movePlayerDown() {
    this.playerCurrentSprite = this.player.sprites.down;
    this.player.position.y += this.player.speed;
    if (this.isCollised(this.arrayOfCells.borders)) {
      this.player.position.y -= this.player.speed;
    } else if (this.isCollised(this.arrayOfCells.house)) {
      console.log("House");
    } else if (this.isCollised(this.arrayOfCells.barn)) {
      console.log("Barn");
    } else if (this.isCollised(this.arrayOfCells.town)) {
      console.log("Town");
    } else if (this.isCollised(this.arrayOfCells.garden)) {
      console.log("Garden");
    }
  }
}

export class Cell {
  static width = window.innerWidth / config.rows;
  static height = window.innerHeight / config.columns;

  constructor({ position }) {
    this.position = position;
  }
}
