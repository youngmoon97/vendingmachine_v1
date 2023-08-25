import * as LED from "./LED.js";

//vdm006
//TODO--확인
//jsdoc
/**
 * param(){}
 * idx=음료 번호
 */
export const beverage = {
  beverages: [
    { idx: 0, name: "Coke", price: "1500", EA: 10 },
    { idx: 1, name: "Coffee", price: "3000", EA: 2 },
    { idx: 2, name: "Tea", price: "2600", EA: 1 },
    { idx: 3, name: "Water", price: "300", EA: 4 },
  ],

  beverageOutlet: [null],

  buyBeverageBtn: function buyBeverageBtn(itemIndex) {
    this.beverages[itemIndex].EA -= 1;
    // console.log(
    //   `this.beverages[itemIndex].EA : ${this.beverages[itemIndex].EA}`
    // );
    //??
    if (this.beverages[itemIndex].EA == 0) {
      LED.LED.noItemLEDsOnOff();
    }
    return this.beverages[itemIndex].name;
    // 금액차감
    // 구매 LED
  },

  getBeverage: function getBeverage() {},
};

const addItemToRack = () => {
  const rackElement = document.querySelector(".rack");

  beverage.beverages.forEach((item, index) => {
    const itemElement = createElement(`${item.name}<br>${item.price}`, index);

    rackElement.appendChild(itemElement);
    if (item.EA == 0) {
      // 품절버튼 ON
    }
  });
};

const createElement = (name, index, callback) => {
  const element = document.createElement("div");
  const buyButton = document.createElement("div");
  const noitemElement = document.createElement("div");

  buyButton.innerText = "구매";
  buyButton.setAttribute("data-index", index);

  noitemElement.innerText = "품절";
  noitemElement.setAttribute("data-index", index);

  element.innerHTML = name;
  element.classList.add("button");
  element.appendChild(buyButton);
  element.appendChild(noitemElement);
  element.setAttribute("data-index", index);
  element.addEventListener("click", callback);

  return element;
};

const onClickItem = () => {
  beverage.buyBeverageBtn(index);
};

console.log("beverage");
addItemToRack();
