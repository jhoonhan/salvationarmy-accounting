import React from "react";

const useGetTotal = (orders) => {
  const getTotalAmount = (type, amount) => {
    let sum;
    if (!type) {
      sum = orders.reduce((a, b) => {
        return a + b[amount];
      }, 0);
    }
    if (type) {
      const filtered = orders.filter((order) => order.type === type);
      sum = filtered.reduce((a, b) => {
        return a + b[amount];
      }, 0);
    }
    return parseInt(sum).toFixed(2);
  };
  return {
    offeringCheckSub: getTotalAmount("check", "amountOffering"),
    offeringCashSub: getTotalAmount("cash", "amountOffering"),
    offeringTotal: getTotalAmount(false, "amountOffering"),

    cartridgeCheckSub: getTotalAmount("check", "amountCartridge"),
    cartridgeCashSub: getTotalAmount("cash", "amountCartridge"),
    cartridgeTotal: getTotalAmount(false, "amountCartridge"),

    thanksGivingCheckSub: getTotalAmount("check", "amountThanksgiving"),
    thanksGivingCashSub: getTotalAmount("cash", "amountThanksgiving"),
    thanksGivingTotal: getTotalAmount(false, "amountThanksgiving"),

    selfDenialCheckSub: getTotalAmount("check", "amountSelfDenial"),
    selfDenialCashSub: getTotalAmount("cash", "amountSelfDenial"),
    selfDenialTotal: getTotalAmount(false, "amountSelfDenial"),

    buildingCheckSub: getTotalAmount("check", "amountBuildingFund"),
    buildingCashSub: getTotalAmount("cash", "amountBuildingFund"),
    buildingTotal: getTotalAmount(false, "amountBuildingFund"),

    subTotalCheck: getTotalAmount("check", "total"),
    subTotalCash: getTotalAmount("cash", "total"),
    total: getTotalAmount(false, "total"),
  };
};

export default useGetTotal;
