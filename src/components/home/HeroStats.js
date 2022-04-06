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

  ///

  const getSundays = () => {
    const daysInMonth = (month, year) => {
      return new Date(year, month, 0);
    };
    const today = new Date();
    const getTot = daysInMonth(today.getMonth(), today.getFullYear()); //Get total days in a month
    var sundays = []; //Declaring array for inserting Sundays

    for (var i = 1; i <= getTot; i++) {
      //looping through days in month
      var newDate = new Date(today.getFullYear(), today.getMonth(), i);
      if (newDate.getDay() === 0) {
        //if Sunday
        sundays.push(i);
      }
    }
    return sundays;
  };
  console.log(getSundays());

  ///

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
