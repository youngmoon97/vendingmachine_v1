const addItemToRack = () => {
  const rackElement = document.querySelector("#rack");

  beverage.beverages.forEach((item, index) => {
    const itemElement = createElement(
      `${item.name}<br>${item.price}`,
      index,
      onClickItem
    );

    rackElement.appendChild(itemElement);
  });
};

//vdm001
const coin = {
  eachAmountOfCoins: [10, 20, 30, 40],
  coinVALUE: [10, 50, 100, 500],
  inputCoin: 0,

  insertCoinBtn: function insertCoinBtn() {
    //동전분류
    let tempidx;
    this.coinValue.forEach((index) => {
      if (this.coinValue[index] == this.inputCoin) {
        tempidx = index;
      }
    });
    // 해당 동전 꽉 찻을때 반환
    if (this.eachAmountOfCoins[tempidx] == 100) {
      moneyReturn.inputMoneyReturn();
    } else {
      // 현재금액에 더하기
      vdmController.moneyAdd(inputCoin, false);
    }
    this.eachAmountOfCoins[tempidx] += 1;
    inputCoin = 0;
  },
};

//vdm002
const paper = {
  amountOfPaper: 0,
  hasPaper: false,

  insertPaperBtn: function insertPaperBtn() {
    if (this.amountOfPaper == 100) {
      moneyReturn.inputMoneyReturn(0, true);
    } else {
      vdmController.moneyAdd(0, hasPaper);
    }
  },
  savePaper: function savePaper() {},
};

//vdm003
const moneyReturn = {
  returnBtn: function returnBtn() {
    if (vdmController.isServiced) {
      //동전 반환
      //순차반환
      let n = vdmController.currentMoney;
      let yesCoin = [];
      let cnt = 0;
      //있는 동전 확인
      LED.noCoinLEDs.forEach((element, index) => {
        if (LED.noCoinLEDs[index] == false) {
          noCoin.push(element);
        }
      });
      yesCoin.reverse.forEach((element) => {
        while (n >= element) {
          cnt = n / element;
          n %= element;
          vdmController.returnMoneys.push(element); //반환구 전해줘야함
        }
      });
    } else {
      if (paper.hasPaper) {
        let returnPaper = 1000;
        vdmController.currentMoney -= returnPaper;
        return returnPaper;
      }
    }
  },
  inputMoneyReturn: function inputMoneyReturn(inputCoin, hasPaper) {
    if (hasPaper) {
      vdmController.returnMoneys.push(1000);
    } else {
      vdmController.returnMoneys.push(inputCoin);
    }
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

  init: function init() {
    currentMoney = 0;
    coinLEDsOnOff();
    fullPaperLEDOnOff();
    noItemLEDsOnOff();
  },
  moneyAdd: function moneyAdd(inputCoin, hasPaper) {
    let tempMoney = this.currentMoney;
    if (hasPaper) {
      this.currentMoney += 1000;
    } else {
      this.currentMoney + inputCoin;
    }
    this.inputMAXChk(currentMoney);
    return tempMoney;
  },
  inputMAXChk: function inputMAXChk(currentMoney) {
    if (tempMoney > this.inputMAX) {
      this.currentMoney = tempMoney;
      moneyReturn.inputMoneyReturn(input, hasPaper);
    }
  },
};

//vdm005
const LED = {
  noCoinLEDs: [false] * 4,
  fullCoinLEDs: [false] * 4,
  fullPaperLED: false,
  buyLEDs: [false] * beverage.beverages.length, //음료 개수 만큼
  noItemLEDs: [false] * beverage.beverages.length, // 음료 개수만큼

  coinLEDsOnOff: function coinLEDsOnOff() {
    // 동전 보유량 확인 및 LED 점등
    coin.eachAmountOfCoins.forEach((coinValue, index) => {
      if (coinValue == 0) {
        noCoinLEDs[index] = true;
      } else if (coinValue == 100) {
        fullCoinLEDs[index] = true;
      }
    });
  },

  fullPaperLEDOnOff: function fullPaperLEDOnOff() {
    if (amountOfPaper == 100) {
      fullPaperLED = true;
    }
  },

  buyLedsOnOff: function buyLedsOnOff() {
    beverage.beverages.forEach((element) => {
      if (element.price <= currentMoney) {
        buyLeds[element.idx] = true;
      }
    });
  },

  noItemLEDsOnOff: function noItemLEDsOnOff() {
    beverage.beverages.forEach((itemIndex, EA) => {
      if (EA == 0) {
        noItemLEDs[itemIndex] = true;
      }
    });
  },
};

//vdm006
const beverage = {
  beverages: [
    { idx: 1, name: "Coke", price: "1500", EA: 10 },
    { idx: 2, name: "Coffee", price: "3000", EA: 2 },
    { idx: 3, name: "Tea", price: "2600", EA: 1 },
    { idx: 4, name: "Water", price: "300", EA: 4 },
  ],

  beverageOutlet: [],

  buyBeverageBtn: function buyBeverageBtn(itemIndex) {
    this.beverages[itemIndex].EA - 1;

    if (this.beverages[itemIndex].EA == 0) {
    }
    return this.beverages[itemIndex].name;
  },

  getBeverage: function getBeverage() {},
};
