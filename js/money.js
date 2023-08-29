import * as moneyReturn from "./moneyReturn.js";
import * as vdmController from "./vdmController.js";
import * as LED from "./LED.js";

//money
// const index = prompt("enter the index");
export const money = {
  eachAmountOfMoneys: [100, 0, 30, 98, 97],
  moneyVALUE: [10, 50, 100, 500, 1000],
  inputMoney: 0,
  hasPaper: false,

  //금액 투입
  insertMoneyBtn: function insertMoneyBtn(inputMoney) {
    this.moneyVALUE.forEach((value, index) => {
      if (value == inputMoney) {
        let whatCoin = index;

        if (index == 4) {
          if (this.hasPaper) {
            console.log(
              `${money.moneyVALUE[index]}원은 한번만 투입가능합니다.`
            );
            moneyReturn.moneyReturn.inputMoneyReturn(1000);
            return 0;
          } else {
            this.hasPaper = true;
          }
        }
        // 해당 동전 꽉 찻을때 반환
        if (this.eachAmountOfMoneys[whatCoin] == 100) {
          // 꽉찼으니깐 반환해줘야히ㅏㄴ
          moneyReturn.moneyReturn.inputMoneyReturn(inputMoney, this.hasPaper);
        } else {
          // 현재금액에 더하기
          vdmController.vdmController.moneyAdd(inputMoney);
          this.eachAmountOfMoneys[whatCoin] += 1;
          console.log(this.eachAmountOfMoneys);
          LED.fullLEDColorOn();
        }
      }
    });
    inputMoney = 0;
  },
  //1000원 보관함으로 이동
  savePaper: function savePaper() {
    this.eachAmountOfMoneys[4] += 1;
    this.hasPaper = false;
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
  const inputMoney = money.moneyVALUE[itemIndex];

  money.insertMoneyBtn(inputMoney);
  vdmController.render();
};

addMoneyToBox();
