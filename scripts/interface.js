import View from "./view.js";
import { Cell } from "./game.js";
import { config } from "./config.js";

export default class InterfaceView extends View {
  constructor() {
    super();
    this.money = "0000";
    this.todayMoney = 0;
    this.yesterdayMoney = 0;
    this.minutes = "00";
    this.hours = "06";

    this.dayTimeIcons = {
      morning: "./images/morningIcon.png",
      day: "./images/dayIcon.png",
      evening: "./images/eveningIcon.png",
      night: "./images/nightIcon.png",
    };

    this.dayTimeIcon = new Image();
    this.moneyIcon = new Image();
    this.nightBackground = new Image();
    this.nightBackground.src = "./images/nightBackground.png";
    this.moneyIcon.src = "./images/money.png";

    this.createTimer();
    this.firstDraw();
  }

  firstDraw() {
    this.moneyIcon.onload = () => {
      this.draw();
    };
  }

  draw() {
    this.drawDayTime();
    view.drawImage(this.moneyIcon);
    view.drawText(`${this.hours} : ${this.minutes}`, 1.145, 12.5); //время
    view.drawText(`${this.money}$`, 19, 13.3); // деньги
  }

  drawDayTime() {
    const morningEndTime = 10;
    const dayEndTime = 17;
    const eveningEndTime = 20;

    if (this.hours < morningEndTime) {
      this.dayTimeIcon.src = this.dayTimeIcons.morning;
    } else if (this.hours < dayEndTime) {
      this.dayTimeIcon.src = this.dayTimeIcons.day;
    } else if (this.hours < eveningEndTime) {
      this.dayTimeIcon.src = this.dayTimeIcons.evening;
    } else {
      this.dayTimeIcon.src = this.dayTimeIcons.night;
    }

    view.drawImage(this.dayTimeIcon);
  }

  createTimer() {
    const oneHour = 60;
    const oneDay = 24;
    const twoDigitNumberStart = 10;

    let inter = setInterval(() => {
      this.minutes++;

      if (this.minutes == oneHour) {
        this.minutes = 0;
        this.hours++;
      }

      if (this.minutes < twoDigitNumberStart) {
        this.minutes = ("0" + this.minutes).slice(-2);
      }

      if (this.hours < twoDigitNumberStart) {
        this.hours = ("0" + this.hours).slice(-2);
      }

      if (this.hours == oneDay) {
        clearInterval(inter);
      }
    }, 500);
  }

  newDay() {
    this.minutes = "00";
    this.hours = "06";
    this.day++;
  }

  showMoneyProfit() {
    this.todayMoney = this.money - this.yesterdayMoney;
    this.yesterdayMoney = this.money;
    return this.todayMoney;
  }

  moneyIncrease(amount) {
    const fourDigitNumberStart = 1000;
    this.money += amount;
    if (this.money < fourDigitNumberStart) {
      this.money = ("000" + this.money).slice(-4);
    }
  }
}

export class Inventory extends View {
  constructor() {
    super();

    this.slot1 = new Image();
    this.slot2 = new Image();
    this.slot3 = new Image();
    this.slot4 = new Image();
    this.slot5 = new Image();
    this.slot6 = new Image();
    this.slot7 = new Image();

    this.slot2.src = Item.items.bucket;
    this.slot5.src = Item.items.tomatoSeeds;
    this.slot1.src = Item.items.showel;
    this.slot3.src = Item.items.potato;
    this.slot7.src = Item.items.potatoSeeds;

    this.slots = [
      this.slot1,
      this.slot2,
      this.slot3,
      this.slot4,
      this.slot5,
      this.slot6,
      this.slot7,
    ];

    this.inventory = [this.slot1, this.slot2, this.slot3, null, this.slot5, null, this.slot7];

    this.inventorySelected = 3;
    this.isEditing = false;

    this.additionalSlot = new Image();
    this.additionalSlotBackground = new Image();
    this.inventoryImage = new Image();
    this.inventorySelectedImage = new Image();
    this.additionalSlotBackground.src = "./images/additionalSlotBackground.png";
    this.inventoryImage.src = "./images/inventory.png";
    this.inventorySelectedImage.src = "./images/inventorySelected.png";

    this.firstDraw();
  }

  firstDraw() {
    this.inventorySelectedImage.onload = () => {
      this.draw();
    };
  }

  draw() {
    this.drawItemInHand();

    let height;
    if (game.player.position.y < (config.columns - 4) * Cell.height) {
      height = 0;
    } else {
      height = -(config.columns - 1) * Cell.height;
    }

    this.drawImageWithPosition(this.inventoryImage, 0, height);
    this.drawImageWithPosition(
      this.inventorySelectedImage,
      (this.inventorySelected + 6) * Cell.width,
      height
    );

    for (let i = 0; i < this.inventory.length; i++) {
      this.drawImageWithPosition(this.inventory[i], (i + 6) * Cell.width, height);
    }
  }

  getItem(item) {
    for (let index = 0; index < this.inventory.length; index++) {
      if (!this.inventory[index]) {
        for (let index2 = 0; index2 < this.slots.length; index2++) {
          if (!this.slots[index2].src) {
            this.slots[index2].src = item;
            this.inventory[index] = this.slots[index2];
            return;
          }
        }
      }
    }
  }

  isObjectInHand(object) {
    if (!this.inventory[this.inventorySelected]) return false;
    return this.inventory[this.inventorySelected].src.includes(object.slice(1));
  }

  isCursorOnInventorySlot(cursorX, cursorY, cellLeftCoord) {
    const cellTopCoord = 8;
    return (
      cursorX >= cellLeftCoord * Cell.width &&
      cursorX <= (cellLeftCoord + 1) * Cell.width &&
      cursorY >= cellTopCoord * Cell.height &&
      cursorY <= (cellTopCoord + 1) * Cell.height
    );
  }

  moveItemTake(event) {
    const slotNumber = Math.trunc(event.offsetX / Cell.width);
    const slotIndexInArray = slotNumber - 6;
    const itemPositionY = -1;

    if (
      this.isCursorOnInventorySlot(event.offsetX, event.offsetY, slotNumber) &&
      this.inventory[slotIndexInArray] != null
    ) {
      this.isEditing = true;
      this.additionalSlot = this.inventory[slotIndexInArray];
      this.inventory[slotIndexInArray] = null;
      this.drawImageWithPosition(this.additionalSlotBackground, slotNumber * Cell.width, 0);
      this.drawImageWithPosition(this.doubleArrowIcon, slotNumber * Cell.width, 0);
      this.drawImageWithPosition(
        this.additionalSlot,
        slotNumber * Cell.width,
        itemPositionY * Cell.height
      );
    }
  }

  moveItemDrop(event) {
    const newSlotNumber = Math.trunc(event.offsetX / Cell.width);
    const slotIndexInArray = newSlotNumber - 6;
    const leftInventoryBorder = 6;
    const rightInventoryBorder = 12;
    if (newSlotNumber < leftInventoryBorder || newSlotNumber > rightInventoryBorder) return;

    if (
      this.isCursorOnInventorySlot(event.offsetX, event.offsetY, newSlotNumber) &&
      this.inventory[slotIndexInArray] == null
    ) {
      this.drawImageWithPosition(this.additionalSlot, newSlotNumber * Cell.width, 0);
      this.inventory[slotIndexInArray] = this.additionalSlot;
      this.additionalSlot = null;
      this.isEditing = false;
    }
  }

  correctSelectedItemImage() {
    if (this.inventorySelected == 0) {
      this.inventorySelectedImage.src = "./images/selectedLeft.png";
    } else if (this.inventorySelected == this.inventory.length - 1) {
      this.inventorySelectedImage.src = "./images/selectedRight.png";
    } else {
      this.inventorySelectedImage.src = "./images/inventorySelected.png";
    }
  }

  scrollInventory(event) {
    const oneScrollInPixels = 125;
    let scroll = event.deltaY / oneScrollInPixels;
    this.inventorySelected += scroll;

    if (this.inventorySelected > this.inventory.length - 1) {
      this.inventorySelected = 0;
    }
    if (this.inventorySelected < 0) {
      this.inventorySelected = this.inventory.length - 1;
    }

    this.correctSelectedItemImage();
  }

  drawItemInHand() {
    let cellAmountWidth = 0.4;
    const cellAmountHeight = 4.5;

    if (game.playerCurrentSprite == game.player.sprites.up) {
      cellAmountWidth = 0.4;
    }
    if (game.playerCurrentSprite == game.player.sprites.down) {
      cellAmountWidth = 0.8;
    }
    if (game.playerCurrentSprite == game.player.sprites.left) {
      cellAmountWidth = 0.1;
    }
    if (game.playerCurrentSprite == game.player.sprites.right) {
      cellAmountWidth = 0.4;
    }

    this.drawImageWithPosAndScale(
      this.inventory[this.inventorySelected],
      game.player.position.x + cellAmountWidth * Cell.width,
      game.player.position.y - (config.columns - cellAmountHeight) * Cell.height,
      window.innerWidth / 1.5,
      window.innerHeight / 1.5
    );
  }
}

export class Item {
  static items = {
    potato: "./images/potato.png",
    potatoSeeds: "./images/potatoSeeds.png",
    tomato: "./images/tomato.png",
    tomatoSeeds: "./images/tomatoSeeds.png",
    radish: "./images/radish.png",
    showel: "./images/showel.png",
    bucket: "./images/bucket.png",
    emptyBucket: "./images/emptyBucket.png",
  };
  constructor() {
    this.amount = 1;
  }
}
