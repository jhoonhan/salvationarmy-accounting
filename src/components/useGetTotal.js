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
    return sum;
  };
  return {
    offering: {
      check: getTotalAmount("check", "amountOffering"),
      cash: getTotalAmount("cash", "amountOffering"),
      total: getTotalAmount(false, "amountOffering"),
    },
    cartridge: {
      check: getTotalAmount("check", "amountCartridge"),
      cash: getTotalAmount("cash", "amountCartridge"),
      total: getTotalAmount(false, "amountCartridge"),
    },
    thanksGiving: {
      check: getTotalAmount("check", "amountThanksgiving"),
      cash: getTotalAmount("cash", "amountThanksgiving"),
      total: getTotalAmount(false, "amountThanksgiving"),
    },
    selfDenial: {
      check: getTotalAmount("check", "amountSelfDenial"),
      cash: getTotalAmount("cash", "amountSelfDenial"),
      total: getTotalAmount(false, "amountSelfDenial"),
    },
    buildingFund: {
      check: getTotalAmount("check", "amountBuildingFund"),
      cash: getTotalAmount("cash", "amountBuildingFund"),
      total: getTotalAmount(false, "amountBuildingFund"),
    },

    subTotalCheck: getTotalAmount("check", "total"),
    subTotalCash: getTotalAmount("cash", "total"),
    total: getTotalAmount(false, "total"),
  };
};

export default useGetTotal;
