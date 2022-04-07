import React, { useState, useEffect } from "react";

const useGetHomeData = (reports, dates) => {
  console.log(`aaaang ! ${dates}`);
  const [filteredReports, setFilteredReports] = useState({
    monthTotal: 0,
    reportsThisMonth: [],
    thisLastDiff: 0,
    reportsThisLastWeek: [],
    attendance: 0,
  });

  useEffect(() => {
    if (!reports) return;
    const reportsThisLastWeek = reports.filter(
      (report) =>
        report.date === dates.currentDate || report.date === dates.prevDate
    );

    let reportsThisMonth = [];
    reports.forEach((report) => {
      const filtered = dates.sundaysThisMonth.filter(
        (date) => date === report.date
      );
      if (filtered[0]) reportsThisMonth.push(report);
    });

    const thisLastDiff = reportsThisLastWeek
      .map((report) => report.total)
      .reduce((a, b) => a - b, 0);

    const monthTotal = reportsThisMonth
      .map((report) => report.total)
      .reduce((a, b) => a + b, 0);

    const attendance = reports.filter(
      (report) => report.date === dates.prevDate
    )[0]?.orders.length;

    setFilteredReports({
      ...filteredReports,
      thisLastDiff,
      reportsThisLastWeek,
      reportsThisMonth,
      monthTotal,
      attendance,
    });
  }, [reports, dates]);

  return filteredReports;
};

export default useGetHomeData;
