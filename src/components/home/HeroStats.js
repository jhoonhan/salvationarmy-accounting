import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import useDateSetter from "../hooks/useDateSetter";

const HeroStats = ({ reports }) => {
  const [dates, setDates] = useDateSetter();
  const [filteredReports, setFilteredReports] = useState({
    monthTotal: 0,
    reportsThisMonth: [],
    thisLastDiff: 0,
    reportsThisLastWeek: [],
    attendance: 0,
  });

  useEffect(() => {
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
    )[0].orders.length;

    setFilteredReports({
      ...filteredReports,
      thisLastDiff,
      reportsThisLastWeek,
      reportsThisMonth,
      monthTotal,
      attendance,
    });
  }, [reports]);

  useEffect(() => {
    console.log(filteredReports);
  }, [filteredReports]);

  const render = () => {
    const {
      monthTotal,
      reportsThisMonth,
      thisLastDiff,
      reportsThisLastWeek,
      attendance,
    } = filteredReports;
    return (
      <article className="ui__container">
        <div className="home__prev">
          <div>
            <h3>From last week</h3>
            <p className="text--large">${thisLastDiff.toFixed(2)}</p>
          </div>
          <div>
            <h3>Total This Month</h3>
            <p className="text--large">${monthTotal.toFixed(2)}</p>
          </div>
          <div>
            <h3>Last Attendance</h3>
            <p className="text--large">{attendance}</p>
          </div>
        </div>
      </article>
    );
  };

  return render();
};

export default HeroStats;
