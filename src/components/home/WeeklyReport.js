import React, { useEffect, useState } from "react";

const WeeklyReport = ({ reports, dates }) => {
  const [filteredReports, setFilteredReports] = useState(() => {
    const filteredReports = dates.sundaysRange.map((date) => {
      const filteredReports = reports.filter((report) => report.date === date);
      return filteredReports[0];
    });
    return filteredReports.reverse();
  });

  useEffect(() => {
    console.log(reports);
    // console.log(filteredReports);
  }, []);

  const renderWeekRows = dates.sundaysRange.reverse().map((date, i) => {
    return <span key={i}>{date.slice(5)}</span>;
  });

  const renderTableRow = (value) => {
    const rows = filteredReports.map((report, i) => {
      if (value === "total")
        return (
          <span className="bold" key={i}>
            $ {(report?.total || 0).toFixed(2)}
          </span>
        );
      if (value !== "total")
        return <span key={i}>$ {(report?.[value].total || 0).toFixed(2)}</span>;
    });
    return rows;
  };

  const renderGraph = filteredReports.map((report, i) => {
    const total = report?.total || 0;
    const height = report?.total > 2000 ? "100%" : `${total / 20}%`;
    return (
      <div className="chart__graph" key={i}>
        <div className="chart__bar" style={{ height }}></div>
      </div>
    );
  });

  const render = () => {
    return (
      <article className="ui__container home__weekly-report">
        <header>
          <h3>Weekly Report</h3>
        </header>
        <div className="flex__vertical">
          <div>
            <div className="chart home__weekly-report__chart">
              <div className="chart__vertical-label">
                <span>$2000</span>
                <span>$1800</span>
                <span>$1600</span>
                <span>$1400</span>
                <span>$1200</span>
                <span>$1000</span>
                <span>$800</span>
                <span>$600</span>
                <span>$400</span>
                <span>$200</span>
                <span>$0</span>
              </div>
              {renderGraph}
            </div>
            <div className="chart__horizontal-label">
              <span></span>
              {renderWeekRows}
            </div>
          </div>
          <div className="table home__weekly-report__table">
            <span></span>
            {renderWeekRows}

            <span>Cart.</span>
            {renderTableRow("cartridge")}

            <span>Offer.</span>
            {renderTableRow("offering")}

            <span>Thnks.</span>
            {renderTableRow("thanksGiving")}

            <span>S & W</span>
            {renderTableRow("selfDenial")}

            <span>Build.</span>
            {renderTableRow("buildingFund")}

            <span className="bold">Total</span>
            {renderTableRow("total")}
          </div>
        </div>
      </article>
    );
  };

  return render();
};

export default WeeklyReport;
