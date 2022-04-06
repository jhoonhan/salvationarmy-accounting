import React, { useState } from "react";

const useDateSetter = () => {
  const _getDates = (inputDate) => {
    let now2;

    if (!inputDate) {
      now2 = new Date();
    }
    if (inputDate) {
      const [year, month, day] = inputDate.split("-");
      now2 = new Date(year, month - 1, day);
    }

    const today = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate());
    const lastSunday = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const prevSunday = new Date(
      today.setDate(today.getDate() - today.getDay() - 7)
    );
    const sundayRange = [
      lastSunday.toISOString().split("T")[0],
      prevSunday.toISOString().split("T")[0],
    ];
    for (let i = 0; i <= 4; i++) {
      const sunday = new Date(
        today.setDate(today.getDate() - today.getDay() - 7)
      );
      sundayRange.push(sunday.toISOString().split("T")[0]);
    }

    return {
      currentDate: lastSunday.toISOString().split("T")[0],
      prevDate: prevSunday.toISOString().split("T")[0],
      sundayRange,
    };
  };

  const [dates, setDates] = useState(_getDates());

  const getDates = (inputDate) => setDates(_getDates(inputDate));

  return [dates, getDates];
};

export default useDateSetter;
