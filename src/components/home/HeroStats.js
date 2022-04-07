import React from "react";

const HeroStats = ({ homeData }) => {
  const render = () => {
    const { monthTotal, thisLastDiff, attendance } = homeData;
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
