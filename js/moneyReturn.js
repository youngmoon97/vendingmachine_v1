import * as vdmController from "./vdmController.js";
import * as LED from "./LED.js";
import * as money from "./money.js";
//vdm003
export const moneyReturn = {
  moneyreturnBtn: function moneyreturnBtn(currentMoney) {
    // 지폐 있으면 반환
    if (money.money.hasPaper) {
      let returnPaper = 1000;
      currentMoney -= returnPaper;
      vdmController.render();
      vdmController.vdmController.returnMoneys.push(returnPaper);
      vdmController.vdmController.currentMoney = currentMoney;
      vdmController.render();
      money.money.hasPaper = false;
    }
    // 동전 반환
    // 순차반환
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
      }
    });
    LED.buyItemLEDColorOn();
    moneyReternToOutlet();
  },

  // 투입 금액 반환
  inputMoneyReturn: function inputMoneyReturn(inputMoney) {
    vdmController.vdmController.returnMoneys.push(inputMoney);
    moneyReternToOutlet();

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
  const outletElement = document.querySelector("#money-outlet");
  outletElement.append(`-------------------\n`);
  vdmController.vdmController.returnMoneys.reverse().forEach((returnMoney) => {
    outletElement.append(`${returnMoney}\n`);
  });

  vdmController.vdmController.returnMoneys = [];
};
