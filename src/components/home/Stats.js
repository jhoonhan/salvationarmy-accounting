import React from "react";

const Stats = ({ reports, users }) => {
  const weeklyAttendance = () => {
    const total = reports.reduce((a, b) => a + b.orders.length, 0);
    return Math.floor(total / reports.length);
  };
  const monthlyAverage = () => {
    const total = reports.reduce((a, b) => a + b.total, 0);
    return Math.floor(total / reports.length);
  };

  const totalToDate = () => {
    return reports.reduce((a, b) => a + b.total, 0);
  };

  const render = () => {
    return (
      <article className="ui__container">
        <div className="home__stats">
          <header>
            <h3>Corps Stats</h3>
          </header>
          <div></div>
          <span>Officers :</span>
          <span>Major Peter & Nakyung Kim</span>

          <span>Total Members :</span>
          <span>{users.length} members</span>

          <span>Weekly Attendance :</span>
          <span>{weeklyAttendance()} members</span>

          <span>Weekly Average :</span>
          <span>$ {monthlyAverage().toFixed(2)}</span>

          <span>Total to date :</span>
          <span>$ {totalToDate().toFixed(2)}</span>
        </div>
      </article>
    );
  };

  return render();
};

export default Stats;
