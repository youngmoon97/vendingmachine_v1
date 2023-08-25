import * as vdmController from "./vdmController.js";
import * as LED from "./LED.js";
//vdm003
export const moneyReturn = {
  moneyreturnBtn: function moneyreturnBtn() {
    // 지폐 있으면 반환
    if (hasPaper) {
      let returnPaper = 1000;
      vdmController.vdmController.currentMoney -= returnPaper;
      return returnPaper;
    }
    // 동전 반환
    // 순차반환
    let n = vdmController.vdmController.currentMoney;
    let yesMoney = [];
    let cnt = 0;
    // 있는 동전 확인
    LED.noCoinLEDs.forEach((element, index) => {
      if (LED.noCoinLEDs[index] == false) {
        noCoin.push(element);
      }
    });
    //TODO-점검
    yesMoney.reverse.forEach((element) => {
      while (n >= element) {
        cnt = n / element;
        n %= element;
        vdmController.vdmController.returnMoneys.push(element); //반환구 전해줘야함
      }
    });
  },
  // 투입 금액 반환
  inputMoneyReturn: function inputMoneyReturn(inputMoney, hasPaper) {
    // console.log(inputMoney);
    if (hasPaper) {
      hasPaper = false;
      console.log(hasPaper);
    }
    vdmController.vdmController.returnMoneys.push(inputMoney);
    // console.log(vdmController.returnMoneys);
  },
};
