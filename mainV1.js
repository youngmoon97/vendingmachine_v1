//money
const money = {
  eachAmountOfMoneys: [10, 20, 30, 40, 0],
  moneyVALUE: [10, 50, 100, 500, 1000],
  inputMoney: 0,
  hasPaper: false,

  //금액 투입
  insertMoneyBtn: function insertMoneyBtn() {
    let tempidx;
    this.moneyVALUE.forEach((index) => {
      if (this.coinValue[index] == this.inputMoney) {
        //1000원 들어옴
        if (index == 4) {
          this.hasPaper = true;
        }
        // 해당 동전 꽉 찻을때 반환
        if (this.eachAmountOfMoneys[index] == 100) {
          moneyReturn.inputMoneyReturn(this.inputMoney, this.hasPaper);
        } else {
          // 현재금액에 더하기
          vdmController.moneyAdd(inputMoney);
          this.eachAmountOfCoins[index] += 1;
        }
      }
    });
    inputMoney = 0;
  },
  //1000원 보관함으로 이동
  savePaper: function savePaper() {
    eachAmountOfMoneys[4] += 1;
    this.hasPaper = false;
  },
};

//vdm003
const moneyReturn = {
  moneyreturnBtn: function moneyreturnBtn() {
    // 지폐 있으면 반환
    if (hasPaper) {
      let returnPaper = 1000;
      vdmController.currentMoney -= returnPaper;
      return returnPaper;
    }
    // 동전 반환
    // 순차반환
    let n = vdmController.currentMoney;
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
        vdmController.returnMoneys.push(element); //반환구 전해줘야함
      }
    });
  },
  // 투입 금액 반환
  inputMoneyReturn: function inputMoneyReturn(inputMoney, hasPaper) {
    if (hasPaper) {
      hasPaper = false;
    }
    vdmController.returnMoneys.push(inputMoney);
  },
};

//vdm004
const vdmController = {
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
      moneyReturn.inputMoneyReturn(input, hasPaper);
      return "return";
    } else {
      return "ok";
    }
  },
};

//vdm005
const LED = {
  noMoneyLEDs: [false] * eachAmountOfMoneys - 1,
  fullMoneyLED: false,
  buyLEDs: [false] * beverage.beverages.length, //음료 개수 만큼
  noItemLEDs: [false] * beverage.beverages.length, // 음료 개수만큼

  noMoneyLEDsOnOff: function noMoneyLEDsOnOff() {
    // 동전 보유량 확인 및 LED 점등
    money.eachAmountOfMoneys.forEach((amount, index) => {
      if (amount == 0) {
        noMoneyLEDs[index] = true;
      } else if (amount == 100) {
        fullMoneyLEDs[index] = true;
      }
    });
  },

  fullMoneyLEDsOnOff: function fullMoneyLEDsOnOff() {
    if (money.eachAmountOfMoneys[4] == 100) {
      fullMoneyLED = true;
    }
  },
  //TODO--확인
  buyLedsOnOff: function buyLedsOnOff() {
    beverage.beverages.forEach((element) => {
      if (element.price <= currentMoney) {
        buyLeds[element.idx] = true;
      }
    });
  },
  //TODO--확인
  noItemLEDsOnOff: function noItemLEDsOnOff() {
    beverage.beverages.forEach((itemIndex, EA) => {
      if (EA == 0) {
        noItemLEDs[itemIndex] = true;
      }
    });
  },
};

//vdm006
//TODO--확인
//jsdoc
/**
 * param(){}
 * idx=음료 번호
 */

const beverage = {
  beverages: [
    { idx: 1, name: "Coke", price: "1500", EA: 10 },
    { idx: 2, name: "Coffee", price: "3000", EA: 2 },
    { idx: 3, name: "Tea", price: "2600", EA: 1 },
    { idx: 4, name: "Water", price: "300", EA: 4 },
  ],

  beverageOutlet: [null],

  buyBeverageBtn: function buyBeverageBtn(itemIndex) {
    this.beverages[itemIndex].EA - 1;

    if (this.beverages[itemIndex].EA == 0) {
    }
    return this.beverages[itemIndex].name;
  },

  getBeverage: function getBeverage() {},
};
beverage;
