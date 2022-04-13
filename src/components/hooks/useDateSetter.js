import React, { useState } from "react";

const useDateSetter = () => {
  const _sundaysThisMonth = (inputDate) => {
    const daysInMonth = (month, year) => {
      return new Date(year, month, 0).getDate();
    };
    const today = !inputDate ? new Date() : new Date(inputDate);
    const getTot = daysInMonth(today.getMonth(), today.getFullYear());

    let sundays = []; //Declaring array for inserting Sundays
    for (let i = 1; i <= getTot; i++) {
      let newDate = new Date(today.getFullYear(), today.getMonth(), i);
      if (newDate.getDay() === 0) {
        sundays.push(
          `${today.getFullYear()}-${(today.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${i.toString().padStart(2, "0")}`
        );
      }
    }
    return sundays;
  };

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
    const sundaysRange = [
      lastSunday.toISOString().split("T")[0],
      prevSunday.toISOString().split("T")[0],
    ];
    for (let i = 0; i <= 3; i++) {
      const sunday = new Date(
        today.setDate(today.getDate() - today.getDay() - 7)
      );
      sundaysRange.push(sunday.toISOString().split("T")[0]);
    }

    return {
      currentDate: lastSunday.toISOString().split("T")[0],
      prevDate: prevSunday.toISOString().split("T")[0],
      sundaysRange,
      sundaysThisMonth: _sundaysThisMonth(lastSunday),
    };
  };

  const [dates, setDates] = useState(_getDates());

  const getDates = (inputDate) => setDates(_getDates(inputDate));

  return [dates, getDates];
};

export default useDateSetter;
