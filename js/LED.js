import * as beverage from "./beverage.js";
import * as money from "./money.js";
import * as vdmController from "./vdmController.js";

//vdm005
export const LED = {
  noMoneyLEDs: [false, false, false, false],
  fullMoneyLEDs: [false, false, false, false, false],
  buyLEDs: [false, false, false, false], //음료 개수 만큼
  noItemLEDs: [false, false, false, false], // 음료 개수만큼
  noMoneyLEDsOnOff: function noMoneyLEDsOnOff() {
    // 동전 보유량 확인 및 LED 점등
    this.noMoneyLEDs = [false, false, false, false];
    money.money.eachAmountOfMoneys.forEach((amount, index) => {
      if (amount == 0) {
        this.noMoneyLEDs[index] = true;
      }
    });
  },

  fullMoneyLEDsOnOff: function fullMoneyLEDsOnOff() {
    this.fullMoneyLEDs = [false, false, false, false, false];
    money.money.eachAmountOfMoneys.forEach((amount, index) => {
      if (amount == 100) {
        this.fullMoneyLEDs[index] = true;
      }
    });
  },

  buyLedsOnOff: function buyLedsOnOff() {
    this.buyLEDs = [false, false, false, false];
    beverage.beverage.beverages.forEach((element, idx) => {
      if (element.price <= vdmController.vdmController.currentMoney) {
        this.buyLEDs[idx] = true;
      }
    });
  },

  noItemLEDsOnOff: function noItemLEDsOnOff() {
    beverage.beverage.beverages.forEach((item, idx) => {
      if (item.EA == 0) {
        this.noItemLEDs[idx] = true;
      }
    });
  },
};

//
export const noLEDColorOn = () => {
  LED.noMoneyLEDsOnOff();
  const noLEDElements = document.querySelectorAll(".noleds");
  noLEDElements.forEach((element, index) => {
    element.style.color = "black";
    element.style.setProperty("animation", "");
    if (
      LED.noMoneyLEDs[index] == true &&
      element.getAttribute("data-index") == index
    ) {
      element.style.color = "red";
      element.style.setProperty("animation", "blink 2s step-end infinite");
    }
  });
};

export const fullLEDColorOn = () => {
  LED.fullMoneyLEDsOnOff();
  const fullLEDElements = document.querySelectorAll(".fullleds");
  fullLEDElements.forEach((element, index) => {
    element.style.color = "black";
    element.style.setProperty("animation", "");
    if (
      LED.fullMoneyLEDs[index] == true &&
      element.getAttribute("data-index") == index
    ) {
      element.style.color = "red";
      element.style.setProperty("animation", "blink 2s step-end infinite");
    }
  });
};

export const noItemLEDColorOn = () => {
  LED.noItemLEDsOnOff();
  const noitemLEDElements = document.querySelectorAll(".noitem");
  const itemsElements = document.querySelectorAll(".items");
  const buyitemLEDElements = document.querySelectorAll(".buyitem");
  noitemLEDElements.forEach((element, index) => {
    if (
      LED.noItemLEDs[index] == true &&
      element.getAttribute("data-index") == index
    ) {
      element.style.color = "red";
      element.style.display = "block";
      itemsElements.forEach((item) => {
        if (
          LED.noItemLEDs[index] == true &&
          item.getAttribute("data-index") == index
        ) {
          item.style.backgroundColor = "gray";
          buyitemLEDElements.forEach((buyBtn) => {
            if (
              LED.noItemLEDs[index] == true &&
              buyBtn.getAttribute("data-index") == index
            ) {
              buyBtn.style.display = "none";
            }
          });
        }
      });
      // itemsElements.item.style.backgroudColor = "blue";
    }
  });
};

export const buyItemLEDColorOn = () => {
  LED.buyLedsOnOff();

  const buyitemLEDElements = document.querySelectorAll(".buyitem");
  buyitemLEDElements.forEach((element, index) => {
    element.style.color = "black";
    element.style.setProperty("animation", "");

    if (
      LED.buyLEDs[index] == true &&
      element.getAttribute("data-index") == index
    ) {
      if (LED.noItemLEDs[index] == false) {
        element.style.color = "blue";
        element.style.setProperty("animation", "blink 1s linear infinite");
      }
    }
  });
};

noLEDColorOn();
fullLEDColorOn();
noItemLEDColorOn();
