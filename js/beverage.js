import * as LED from "./LED.js";
import * as vdmController from "./vdmController.js";

export const beverage = {
  beverages: [
    { idx: 0, name: "Coke", price: "1500", EA: 10 },
    { idx: 1, name: "Coffee", price: "3000", EA: 2 },
    { idx: 2, name: "Tea", price: "2600", EA: 0 },
    { idx: 3, name: "Water", price: "300", EA: 4 },
  ],

  beverageOutlet: [],

  buyBeverageBtn: function buyBeverageBtn(itemIndex) {
    if (LED.LED.noItemLEDs[itemIndex] == true) {
      console.log("품절되어 구매할 수 없습니다.");
    } else {
      this.beverages[itemIndex].EA -= 1;
      const item = this.beverages[itemIndex];
      // 음료 소진
      if (this.beverages[itemIndex].EA == 0) {
        LED.LED.noItemLEDsOnOff();
      }
      showResultPopup(`${item.name}을(를) 획득했다!`);
      // 금액차감
      // 구매 LED
      // TODOTODOTODOTO
      vdmController.vdmController.currentMoney -= this.beverages.filter(
        (item) => item.idx == itemIndex
      ).price;

      LED.noItemLEDsOnOff();
    }
  },

  getBeverage: function getBeverage() {},
};

const addItemToRack = () => {
  const rackElement = document.querySelector(".rack");

  beverage.beverages.forEach((item, index) => {
    const itemElement = createElement(
      `${item.name}<br>${item.price}`,
      index,
      onClickItem
    );

    rackElement.appendChild(itemElement);
    if (item.EA == 0) {
      // 품절버튼 ON
    }
  });
};

const createElement = (name, index, onClickItem) => {
  const element = document.createElement("div");
  const buyButton = document.createElement("div");
  const noitemElement = document.createElement("div");

  buyButton.innerText = "구매";
  buyButton.classList.add("button");
  buyButton.setAttribute("data-index", index);
  buyButton.addEventListener("click", onClickItem);

  noitemElement.innerText = "품절";
  noitemElement.classList.add("noitem");
  noitemElement.setAttribute("data-index", index);

  element.innerHTML = name;
  element.classList.add("button");
  element.appendChild(buyButton);
  element.appendChild(noitemElement);
  element.setAttribute("data-index", index);

  return element;
};

const onClickItem = (event) => {
  const targetElement = event.target;
  const itemIndex = targetElement.getAttribute("data-index");

  beverage.buyBeverageBtn(itemIndex);
};

addItemToRack();
