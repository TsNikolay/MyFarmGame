import Config from "./config.js";
import { collision } from "../data/collision.js";

export default class Game {
  constructor() {
    this.config = new Config();
    this.playerCurrentImage = new Image();
    this.playerUpImage = new Image();
    this.playerDownImage = new Image();
    this.playerLeftImage = new Image();
    this.playerRightImage = new Image();
    this.playfield = this.createPlayfield();
    this.player = this.createPlayer();
    this.boundaries = this.createCollision();
  }

  createCollision() {
    const collisionsArray = [];
    for (let i = 0; i < collision.length; i += 19) {
      collisionsArray.push(collision.slice(i, 19 + i));
    }

    const boundaries = [];

    for (let index1 = 0; index1 < collisionsArray.length; index1++) {
      for (let index2 = 0; index2 < collisionsArray[index1].length; index2++) {
        if (collisionsArray[index1][index2] != 0) {
          boundaries.push(
            new Boundary({
              position: {
                x: index1 * Boundary.width,
                y: index2 * Boundary.height,
              },
            })
          );
        }
      }
    }
    return boundaries;
  }

  createPlayfield() {
    const playfield = [];

    for (let y = 0; y < this.config.rows; y++) {
      playfield[y] = [];
      for (let x = 0; x < this.config.columns; x++) {
        playfield[y][x] = 0;
      }
    }
    return playfield;
  }

  createPlayer() {
    this.playerCurrentImage.src = "../images/characterDown1.png";
    this.playerUpImage.src = "../images/characterUp1.png";
    this.playerDownImage.src = "../images/characterDown1.png";
    this.playerLeftImage.src = "../images/characterLeft1.png";
    this.playerRightImage.src = "../images/characterRight1.png";

    const player = {
      position: {
        x: window.innerWidth / 2 - 65, // 65 отступ чтоб по центру был перс
        y: window.innerHeight / 2,
      },

      velocity: 10,
      frames: { ...frames, val: 0, max: 3, scenesAmount: 0 },
      isMoving: false,

      width: this.playerDownImage.width / 3,
      height: this.playerDownImage.height,

      sprites: {
        up: this.playerUpImage,
        down: this.playerDownImage,
        left: this.playerLeftImage,
        right: this.playerRightImage,
      },
    };
    return player;
  }

  movePlayerLeft() {
    this.player.isMoving = true;
    this.playerCurrentImage = this.player.sprites.left;
    this.player.position.x -= this.player.velocity;
  }

  movePlayerRight() {
    this.player.isMoving = true;
    this.playerCurrentImage = this.player.sprites.right;
    this.player.position.x += this.player.velocity;
  }

  movePlayerUp() {
    this.player.isMoving = true;
    this.playerCurrentImage = this.player.sprites.up;
    this.player.position.y -= this.player.velocity;
  }

  movePlayerDown() {
    this.player.isMoving = true;
    this.playerCurrentImage = this.player.sprites.down;
    this.player.position.y += this.player.velocity;
  }
}

export class Boundary {
  static width = window.innerWidth / 19;
  static height = window.innerHeight / 9;

  constructor({ position }) {
    this.position = position;
  }
}
