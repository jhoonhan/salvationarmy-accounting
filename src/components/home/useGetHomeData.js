import React, { useState, useEffect } from "react";

const useGetHomeData = (reports, dates) => {
  const [filteredReports, setFilteredReports] = useState({
    monthTotal: 0,
    reportsThisMonth: [],
    thisLastDiff: 0,
    reportsThisLastWeek: [],
    attendance: 0,
  });

  useEffect(() => {
    if (!reports[0]) return;
    const reportsThisLastWeek = () => {
      const thisWeek = reports.filter(
        (report) => report.date === dates.currentDate
      );
      const lastWeek = reports.filter(
        (report) => report.date === dates.prevDate
      );
      return [thisWeek[0] || [], lastWeek[0] || []];
    };

    let reportsThisMonth = [];
    reports.forEach((report) => {
      const filtered = dates.sundaysThisMonth.filter(
        (date) => date === report.date
      );
      if (filtered[0]) reportsThisMonth.push(report);
    });

    const thisLastDiff = () => {
      const totals = reportsThisLastWeek().map((report) => {
        return report.total;
      });
      return (totals[1] || 0) - (totals[0] || 0);
    };

    const monthTotal = reportsThisMonth
      .map((report) => report.total)
      .reduce((a, b) => a + b, 0);

    const attendance = () => {
      const filtered = reports.filter(
        (report) => report.date === dates.currentDate
      );
      if (!filtered[0]) return 0;
      if (filtered[0]) return filtered[0].orders.length;
    };

    setFilteredReports({
      ...filteredReports,
      thisLastDiff: thisLastDiff(),
      reportsThisLastWeek: reportsThisLastWeek(),
      reportsThisMonth,
      monthTotal,
      attendance: attendance(),
    });
  }, [reports, dates]);

  return filteredReports;
};

export default useGetHomeData;
