import React, { useState } from "react";

const useDateSetter = () => {
  const initialValues = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastSunday = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const prevSunday = new Date(
      today.setDate(today.getDate() - today.getDay() - 7)
    );
    return [
      lastSunday.toISOString().split("T")[0],
      prevSunday.toISOString().split("T")[0],
    ];
  };

  const [dates, setDates] = useState(initialValues());

  const getDates = (inputDate) => {
    setDates(() => {
      const [year, month, day] = inputDate.split("-");
      const now = new Date(year, month - 1, day);
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const lastSunday = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      console.log(lastSunday);

      const prevSunday = new Date(
        today.setDate(today.getDate() - today.getDay() - 7)
      );
      return [
        lastSunday.toISOString().split("T")[0],
        prevSunday.toISOString().split("T")[0],
      ];
    });
  };
  return [dates, getDates];
};

export default useDateSetter;
