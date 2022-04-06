import React, { useState } from "react";

const useDateSetter = (value) => {
  const [dates, setDates] = useState(value);

  const now = new Date(dates);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
  const prevSunday = new Date(
    today.setDate(today.getDate() - today.getDay() - 7)
  );

  return [
    [
      lastSunday.toISOString().split("T")[0],
      prevSunday.toISOString().split("T")[0],
    ],
    setDates,
  ];
};

export default useDateSetter;
