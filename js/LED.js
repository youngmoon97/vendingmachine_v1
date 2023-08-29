import * as beverage from "./beverage.js";
import * as money from "./money.js";

//vdm005
export const LED = {
  noMoneyLEDs: [false, false, false, false],
  fullMoneyLEDs: [false, false, false, false, false],
  buyLEDs: [false, false, false, false], //음료 개수 만큼
  noItemLEDs: [false, false, false, false], // 음료 개수만큼
  noMoneyLEDsValues: [
    "10원 동전 없음",
    "50원 동전 없음",
    "100원 동전 없음",
    "500원 동전 없음",
  ],
  fullMoneyLEDsValues: [
    "10원 동전 꽉 참",
    "50원 동전 꽉 참",
    "100원 동전 꽉 참",
    "500원 동전 꽉 참",
    "1000원 지폐 꽉 참",
  ],
  noMoneyLEDsOnOff: function noMoneyLEDsOnOff() {
    // 동전 보유량 확인 및 LED 점등
    money.money.eachAmountOfMoneys.forEach((amount, index) => {
      if (amount == 0) {
        this.noMoneyLEDs[index] = true;
      } else if (amount == 100) {
        this.fullMoneyLEDs[index] = true;
      }
    });
  },

  fullMoneyLEDsOnOff: function fullMoneyLEDsOnOff() {
    if (money.money.eachAmountOfMoneys[4] == 100) {
      this.fullMoneyLED = true;
    }
  },

  buyLedsOnOff: function buyLedsOnOff() {
    beverage.beverage.beverages.forEach((element) => {
      if (element.price <= currentMoney) {
        buyLeds[element.idx] = true;
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
    if (
      LED.noMoneyLEDs[index] == true &&
      element.getAttribute("data-index") == index
    ) {
      element.style.color = "red";
    }
  });
};
export const fullLEDColorOn = () => {
  LED.fullMoneyLEDsOnOff();
  const fullLEDElements = document.querySelectorAll(".fullleds");
  fullLEDElements.forEach((element, index) => {
    if (
      LED.fullMoneyLEDs[index] == true &&
      element.getAttribute("data-index") == index
    ) {
      element.style.color = "red";
    }
  });
};
// export const noItemLEDColorOn = () => {
//   LED.noItemLEDsOnOff();
//   const noitemLEDElements = document.querySelectorAll(".noitem");
//   noitemLEDElements.forEach((element, index) => {
//     if (
//       LED.noItemLEDs[index] == true &&
//       element.getAttribute("data-index") == index
//     ) {
//       element.style.color = "red";
//     }
//   });
// };

noLEDColorOn();
fullLEDColorOn();
console.log(beverage.beverage);
console.log(money.money);

// LED.noItemLEDsOnOff();
