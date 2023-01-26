import Game from "./game.js";
import View from "./view.js";
import { MainLocationGame, MainLocationView } from "./mainLocation.js";
import { HouseGame, HouseView } from "./house.js";
import { config } from "./config.js";
import Controller from "./controller.js";
import InterfaceView, { Inventory } from "./interface.js";

const game = new Game();
const view = new View(game);
const mainLocationGame = new MainLocationGame();
const mainLocationView = new MainLocationView(mainLocationGame);
const interfaceView = new InterfaceView();
const inventory = new Inventory();
const houseGame = new HouseGame(interfaceView);
const houseView = new HouseView(houseGame);

const controller = new Controller(
  game,
  view,
  interfaceView,
  inventory,
  mainLocationGame,
  mainLocationView,
  houseGame,
  houseView
);

window.interfaceView = interfaceView;
window.inventory = inventory;
window.mainLocationView = mainLocationView;
window.mainLocationGame = mainLocationGame;
window.houseView = houseView;
window.houseGame = houseGame;
window.game = game;
window.config = config;
window.view = view;
window.controller = controller;
