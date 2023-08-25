import * as beverage from "./beverage.js";
import * as money from "./money.js";

//vdm005
export const LED = {
  noMoneyLEDs: [false] * money.money.eachAmountOfMoneys - 1,
  fullMoneyLED: false,
  buyLEDs: [false] * 4, //음료 개수 만큼
  noItemLEDs: [false] * 4, // 음료 개수만큼
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
        noMoneyLEDs[index] = true;
      } else if (amount == 100) {
        fullMoneyLEDs[index] = true;
      }
    });
  },

  fullMoneyLEDsOnOff: function fullMoneyLEDsOnOff() {
    if (money.money.eachAmountOfMoneys[4] == 100) {
      fullMoneyLED = true;
    }
  },
  //TODO--확인
  buyLedsOnOff: function buyLedsOnOff() {
    beverage.beverage.beverages.forEach((element) => {
      if (element.price <= currentMoney) {
        buyLeds[element.idx] = true;
      }
    });
  },
  //TODO--확인
  noItemLEDsOnOff: function noItemLEDsOnOff() {
    console.log("dd");
    beverage.beverage.beverages.forEach((itemIndex, EA) => {
      if (EA == 0) {
        noItemLEDs[itemIndex] = true;
      }
    });
    console.log(noItemLEDs);
  },
};

const addLedToLEDBox = () => {
  const LEDElement = document.querySelector(".leds");

  LED.noMoneyLEDsValues.forEach((led, index) => {
    const ledVals = createElement(`${led}`, index);

    LEDElement.appendChild(ledVals);
  });
  LED.fullMoneyLEDsValues.forEach((led, index) => {
    const ledVals = createElement(`${led}`, index);

    LEDElement.appendChild(ledVals);
  });
};
const createElement = (name, index) => {
  const element = document.createElement("div");

  element.innerHTML = name;
  element.classList.add("button");
  element.setAttribute("data-index", index);
  return element;
};

addLedToLEDBox();
