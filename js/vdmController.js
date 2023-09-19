import * as moneyReturn from "./moneyReturn.js";
import * as LED from "./LED.js";
import { beverage } from "./beverage.js";

//vdm004
export const vdmController = {
  currentMoney: 0,
  returnMoneys: [],
  inputMAX: 9999,
  //초기화
  // init: function init() {
  //   beverage.isServiced = false;
  //   beverage.beverageOutlet = [];
  //   money.hasPaper = false;
  //   LED.LED.noMoneyLEDsOnOff();
  //   LED.LED.fullMoneyLEDsOnOff();
  //   LED.LED.buyLedsOnOff();
  //   LED.LED.noItemLEDsOnOff();
  // },
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

export const render = () => {
  document.querySelector("#current-money").innerHTML =
    vdmController.currentMoney.toString();
};

render();
// init();
