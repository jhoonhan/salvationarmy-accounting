import React from "react";
import { render } from "react-dom";
import useDateSetter from "../hooks/useDateSetter";

const HeroStats = ({ reports }) => {
  console.log(reports);
  const [dates, setDates] = useDateSetter();

  const reportsThisLastWeek = reports.filter(
    (report) =>
      report.date === dates.currentDate || report.date === dates.prevtDate
  );

  const reportsThisMonth = reports.map((report) => {
    const fuck = dates.sundaysThisMonth.filter((el) => {
      return el === report.date;
    });
    console.log(fuck);
    return fuck;
  });
  console.log(reportsThisMonth);

  const render = () => {
    return (
      <article className="ui__container">
        <div className="home__prev">
          <div>
            <h3>From last week</h3>
            <p className="text--large">-$100.00</p>
          </div>
          <div>
            <h3>Total This Month</h3>
            <p className="text--large">$920.00</p>
          </div>
          <div>
            <h3>Attendance</h3>
            <p className="text--large">16</p>
          </div>
        </div>
      </article>
    );
  };

  return render();
};

export default HeroStats;
