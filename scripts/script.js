import View from "./view.js";
import Config from "./config.js";
import Controller from "./controller.js";
import Game from "./game.js";

const config = new Config();
const game = new Game();
const view = new View();
const controller = new Controller(game, view);

window.game = game;
window.config = config;
window.view = view;
window.controller = controller;
