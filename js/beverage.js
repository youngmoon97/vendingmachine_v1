import * as LED from "./LED.js";
import { money } from "./money.js";
import * as vdmController from "./vdmController.js";

export const beverage = {
  beverages: [
    {
      idx: 0,
      name: "Coke",
      price: "1500",
      EA: 10,
      pic: "../image/coke.jpg",
    },
    {
      idx: 1,
      name: "Coffee",
      price: "3000",
      EA: 0,
      pic: "../image/coffee.jpg",
    },
    {
      idx: 2,
      name: "Tea",
      price: "2600",
      EA: 2,
      pic: "../image/tea.jpg",
    },
    {
      idx: 3,
      name: "Water",
      price: "260",
      EA: 4,
      pic: "../image/water.jpg",
    },
  ],

  beverageOutlet: [],
  isServiced: false,
  buyBeverageBtn: function buyBeverageBtn(itemIndex) {
    const item = this.beverages[itemIndex];
    if (LED.LED.noItemLEDs[itemIndex] == true) {
      alert("품절되어 구매할 수 없습니다.");
      console.log("품절되어 구매할 수 없습니다.");
    } else {
      item.EA -= 1;
      beverage.beverageOutlet.push(item.name);
      alert(`${item.name}을 구매하였습니다.\n음료반환구를 확인해주세요!`);
      itemToOutlet();

      if (money.hasPaper) {
        money.savePaper();
      }
      if (item.EA == 0) {
        LED.noItemLEDColorOn();
      }
      this.isServiced = true;
      vdmController.vdmController.currentMoney -= item.price;
      vdmController.render();
      LED.buyItemLEDColorOn();
    }
  },

  getBeverage: function getBeverage(list) {
    const beverageList = list
      .trim()
      .replace(/-------------------/g, " ")
      .replace(/\n/g, "")
      .split(" ");
    //alert
    beverageList.pop();
    console.log(beverageList);
    if (beverageList.length === 0) {
      alert("회수할 음료가 없습니다.");
    } else {
      alert(`${beverageList}을 회수합니다.`);
    }

    console.log(beverageList);
  },
};

const addItemToRack = () => {
  const rackElement = document.querySelector(".rack");

  beverage.beverages.forEach((item, index) => {
    const itemElement = createElement(
      item.pic,
      item.name,
      item.price,
      index,
      onClickItem
    );

    rackElement.appendChild(itemElement);
    if (item.EA == 0) {
      // LED.LED
    }
  });
};

const createElement = (pic, name, price, index, onClickItem) => {
  const element = document.createElement("div");
  const buyButton = document.createElement("div");
  const noitemElement = document.createElement("div");
  const img = document.createElement("img");

  buyButton.innerText = "구매";
  buyButton.classList.add("buyitem");
  buyButton.setAttribute("data-index", index);
  buyButton.addEventListener("click", onClickItem);

  noitemElement.innerText = "품절";
  noitemElement.classList.add("noitem");
  noitemElement.style.display = "none";
  noitemElement.setAttribute("data-index", index);

  img.innerHTML = "";
  img.classList.add("image");
  img.src = pic;
  img.width = 200;
  img.setAttribute("data-index", index);

  element.innerHTML = `${name}<br>${price}원`;
  element.classList.add("items");
  element.appendChild(img);
  element.appendChild(buyButton);
  element.appendChild(noitemElement);

  element.setAttribute("data-index", index);

  return element;
};

const onClickItem = (event) => {
  const targetElement = event.target;
  const itemIndex = targetElement.getAttribute("data-index");
  if (
    vdmController.vdmController.currentMoney <
    beverage.beverages[itemIndex].price
  ) {
    alert("금액이 부족합니다!");
    console.log("금액이 부족합니다!");
    return 0;
  }
  beverage.buyBeverageBtn(itemIndex);
};

const itemToOutlet = () => {
  const outletElement = document.querySelector("#beverage-outlet");
  beverage.beverageOutlet.forEach((item) => {
    outletElement.value += `${item}\n-------------------\n`;
  });
  beverage.beverageOutlet = [];
};

const getBaseElement = document.querySelector("#get-beverage");

const onClickGetBeverage = () => {
  const beverageElementList = document.querySelector("#beverage-outlet");
  const getBeverageList = beverageElementList.value;
  beverage.getBeverage(getBeverageList);
  beverageElementList.value = "";
};

getBaseElement.addEventListener("click", onClickGetBeverage);

addItemToRack();
