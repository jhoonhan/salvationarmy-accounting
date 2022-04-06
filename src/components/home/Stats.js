import React from "react";

const Stats = () => {
  return (
    <article className="ui__container">
      <header>
        <h3>Corps Stats</h3>
      </header>
      <div className="home__stats">
        <span>Members :</span>
        <span>36 members</span>

        <span>Weekly Attendance :</span>
        <span>16 members</span>

        <span>Monthly Avg :</span>
        <span>$ 980.00</span>

        <span>Weekly Avg :</span>
        <span>$ 980.00</span>

        <span>Total to date :</span>
        <span>$ 52980.00</span>
      </div>
    </article>
  );
};

export default Stats;
