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

  const sundaysThisMonth = () => {
    const daysInMonth = (month, year) => {
      return new Date(year, month, 0).getDate();
    };
    const today = new Date();
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
