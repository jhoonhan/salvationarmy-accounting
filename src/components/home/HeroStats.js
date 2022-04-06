import React from "react";

const HeroStats = () => {
  return (
    <article className="ui__container">
      <div className="home__prev">
        <div>
          <h3>From last week</h3>
          <p className="text--large">-$100.00</p>
        </div>
        <div>
          <h3>Total</h3>
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

export default HeroStats;
