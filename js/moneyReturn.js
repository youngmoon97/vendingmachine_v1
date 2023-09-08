import * as vdmController from "./vdmController.js";
import * as LED from "./LED.js";
import * as money from "./money.js";
import * as beverage from "./beverage.js";
//vdm003
export const moneyReturn = {
  moneyreturnBtn: function moneyreturnBtn(currentMoney) {
    console.log(`currentMoney : ${currentMoney}`);
    console.log(
      `beverage.beverage.isServiced : ${beverage.beverage.isServiced}`
    );

    if (!beverage.beverage.isServiced) {
      console.log("TEST : " + money.money.inputMoneyList);
      // 서비스 사용 안함
      this.inputMoneyReturn(money.money.inputMoneyList);
    } else {
      // 지폐 있으면 반환
      if (money.money.hasPaper) {
        let returnPaper = 1000;
        currentMoney -= returnPaper;
        vdmController.vdmController.returnMoneys.push(returnPaper);
        // vdmController.vdmController.returnMoneys.push(returnPaper);
        vdmController.vdmController.currentMoney = currentMoney;
        vdmController.render();
      }
      // 동전 반환
      // 순차 반환
      let yesMoney = [];
      // 있는 동전 확인
      LED.LED.noMoneyLEDsOnOff();
      LED.LED.noMoneyLEDs.forEach((element, index) => {
        if (element == false) {
          yesMoney.push(money.money.moneyVALUE[index]);
        }
      });
      yesMoney.reverse().forEach((element) => {
        while (currentMoney >= element) {
          let tempIndex;
          switch (element) {
            case 10:
              tempIndex = 0;
              break;
            case 50:
              tempIndex = 1;
              break;
            case 100:
              tempIndex = 2;
              break;
            case 500:
              tempIndex = 3;
              break;
          }
          if (money.money.eachAmountOfMoneys[tempIndex] == 0) {
            LED.noLEDColorOn();
            break;
          }
          currentMoney -= element;
          money.money.moneyVALUE.forEach((eachMoney, index) => {
            if (eachMoney == element) {
              money.money.eachAmountOfMoneys[index] -= 1;
            }
          });
          vdmController.vdmController.currentMoney = currentMoney;
          vdmController.render();
          vdmController.vdmController.returnMoneys.push(element); //반환구 전해줘야함
          console.log(`element : ${element}`);
        }
      });
      moneyReternToOutlet();
    }
    money.money.hasPaper = false;
    money.money.inputMoneyList = [];
    LED.buyItemLEDColorOn();
    LED.noLEDColorOn();
    LED.fullLEDColorOn();
  },

  // 투입 금액 반환
  inputMoneyReturn: function inputMoneyReturn(inputMoney) {
    if (typeof inputMoney == "number") {
      vdmController.vdmController.returnMoneys.push(inputMoney);
    } else if (typeof inputMoney == "object") {
      inputMoney.forEach((element) => {
        vdmController.vdmController.returnMoneys.push(element);

        vdmController.vdmController.currentMoney -= element;
        money.money.moneyVALUE.forEach((eachMoney, index) => {
          if (eachMoney == element) {
            money.money.eachAmountOfMoneys[index] -= 1;
          }
        });
        vdmController.render();
      });
    }
    moneyReternToOutlet();
    LED.buyItemLEDColorOn();
    LED.noLEDColorOn();
    LED.fullLEDColorOn();

    // 금액반환구에 표시
  },
};

const resultBaseElement = document.querySelector("#money-return");

const onClickMoneyReturn = () => {
  const currentMoney = document.querySelector("#current-money").innerHTML;
  if (currentMoney == 0) {
    alert("반환할 금액이 없습니다.");
    return 0;
  }
  alert(`${currentMoney}원을 반환합니다.`);
  moneyReturn.moneyreturnBtn(currentMoney);
};
resultBaseElement.addEventListener("click", onClickMoneyReturn);

const moneyReternToOutlet = () => {
  console.log("??");
  const outletElement = document.querySelector("#money-outlet");
  vdmController.vdmController.returnMoneys.reverse().forEach((returnMoney) => {
    console.log(`returnMoney : ${returnMoney}`);
    outletElement.value += `${returnMoney}\n`;
  });
  outletElement.value += `-------------------\n`;
  vdmController.vdmController.returnMoneys = [];
};
const getMoneyBtn = document.querySelector("#get-money");

const onClickGetMoney = () => {
  const returnMoneyElements = document.querySelector("#money-outlet");
  if (returnMoneyElements.value == "") {
    alert("반환 금액이 없습니다.");
  } else {
    returnMoneyElements.value = "";
    alert("반환 금액 회수하겠습니다.");
  }
};
getMoneyBtn.addEventListener("click", onClickGetMoney);
