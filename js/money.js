import * as moneyReturn from "./moneyReturn.js";
import * as vdmController from "./vdmController.js";
import * as LED from "./LED.js";

//money
// const index = prompt("enter the index");
export const money = {
  eachAmountOfMoneys: [0, 90, 5, 40, 50],
  moneyVALUE: [10, 50, 100, 500, 1000],
  inputMoney: 0,
  hasPaper: false,
  inputMoneyList: [],
  //금액 투입
  insertMoneyBtn: function insertMoneyBtn(inputMoney) {
    if (
      vdmController.vdmController.currentMoney + inputMoney <=
      vdmController.vdmController.inputMAX
    ) {
      this.moneyVALUE.forEach((value, index) => {
        if (value == inputMoney) {
          let whatCoin = index;
          if (whatCoin == 4 && this.eachAmountOfMoneys[whatCoin] < 100) {
            if (this.hasPaper) {
              alert(
                `${money.moneyVALUE[index]}원은 한번만 투입가능합니다.\n반환하겠습니다.`
              );
              moneyReturn.moneyReturn.inputMoneyReturn(inputMoney);

              return 0;
            } else {
              console.log("hasd");
              this.hasPaper = true;
            }
          }
          // 해당 동전 꽉 찻을때 반환
          if (this.eachAmountOfMoneys[whatCoin] == 100) {
            moneyReturn.moneyReturn.inputMoneyReturn(inputMoney);
            alert(`${inputMoney}원 보관함이 꽉 찼습니다. 반환하겠습니다.`);
          } else {
            // 현재금액에 더하기
            if (this.inputMoneyList.includes(1000) && inputMoney < 1000) {
              this.inputMoneyList.push(inputMoney);
            } else {
              this.inputMoneyList.push(inputMoney);
            }
            vdmController.vdmController.moneyAdd(inputMoney);
            if (whatCoin != 4) {
              this.eachAmountOfMoneys[whatCoin] += 1;
            }
            LED.buyItemLEDColorOn();
          }
          LED.noLEDColorOn();
          LED.fullLEDColorOn();
          // console.log(`this.inputMoneyList : ${this.inputMoneyList}`);
        }
      });
    } else {
      alert(
        "최대 투입 금액은 9990원입니다.\n마지막 투입 금액을 반환하겠습니다."
      );
      moneyReturn.moneyReturn.inputMoneyReturn(inputMoney);
    }
    inputMoney = 0;
  },
  //1000원 보관함으로 이동
  savePaper: function savePaper() {
    this.eachAmountOfMoneys[4] += 1;
    this.hasPaper = false;
    LED.fullLEDColorOn();
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
  element.classList.add("money-value");
  element.setAttribute("data-index", index);
  element.setAttribute("type", "button");
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
