import * as moneyReturn from "./moneyReturn.js";
import * as vdmController from "./vdmController.js";

//money
// const index = prompt("enter the index");
export const money = {
  eachAmountOfMoneys: [10, 20, 30, 40, 99],
  moneyVALUE: [10, 50, 100, 500, 1000],
  inputMoney: 0,
  hasPaper: false,

  //금액 투입
  insertMoneyBtn: function insertMoneyBtn(inputMoney) {
    // console.log(inputMoney);
    this.moneyVALUE.forEach((value, index) => {
      // console.log(value);
      if (value == inputMoney) {
        let whatCoin = index;
        // console.log(whatCoin);
        //1000원 들어옴
        if (index == 4) {
          this.hasPaper = true;
          // console.log(this.hasPaper);
        }
        // 해당 동전 꽉 찻을때 반환
        if (this.eachAmountOfMoneys[whatCoin] == 100) {
          console.log("full");
          moneyReturn.moneyReturn.inputMoneyReturn(inputMoney, this.hasPaper);
        } else {
          // 현재금액에 더하기
          vdmController.vdmController.moneyAdd(inputMoney);
          this.eachAmountOfMoneys[whatCoin] += 1;
          // console.log(`this.eachAmountOfMoneys : ${this.eachAmountOfMoneys}`);
        }
      }
    });
    inputMoney = 0;
  },
  //1000원 보관함으로 이동
  savePaper: function savePaper() {
    this.eachAmountOfMoneys[4] += 1;
    this.hasPaper = false;
    // console.log(this.eachAmountOfMoneys);
  },
};

const addMoneyToBox = () => {
  const moneyElement = document.querySelector(".money-box");

  money.moneyVALUE.forEach((moneyVal, index) => {
    const moneyVals = createElement(`${moneyVal}`, index, onClickMoney);

    moneyElement.appendChild(moneyVals);
  });
};
const createElement = (name, index, callback) => {
  const element = document.createElement("div");

  element.innerHTML = name;
  element.classList.add("button");
  element.setAttribute("data-index", index);
  element.addEventListener("click", callback);

  return element;
};
const onClickMoney = (event) => {
  const targetElement = event.target;
  const itemIndex = targetElement.getAttribute("data-index");
  const inputMoney = moneyVALUE[itemIndex];

  money.insertMoneyBtn(inputMoney);
};

addMoneyToBox();
