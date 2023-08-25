import * as moneyReturn from "./moneyReturn.js";

//vdm004
export const vdmController = {
  inputMAX: 9990,
  boxMAX: 100,
  inputMoney: 0,
  currentMoney: 0,
  isServiced: false,
  returnMoneys: [],
  //초기화
  init: function init() {
    currentMoney = 0;
    coinLEDsOnOff();
    fullPaperLEDOnOff();
    noItemLEDsOnOff();
  },
  //투입 금액 계산
  moneyAdd: function moneyAdd(inputMoney) {
    let tempMoney = this.currentMoney + inputMoney;
    if (this.inputMAXChk(tempMoney) == "return") {
      return 0;
    } else {
      this.currentMoney += inputMoney;
    }
  },
  //최대 투입 금액 계산
  inputMAXChk: function inputMAXChk(tempMoney) {
    if (tempMoney > this.inputMAX) {
      this.currentMoney = tempMoney;
      moneyReturn.moneyReturn.inputMoneyReturn(input, hasPaper);
      return "return";
    } else {
      return "ok";
    }
  },
};
