import React, { useEffect, useState } from "react";

const WeeklyReport = ({ reports, dates }) => {
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    const filteredReports = dates.sundaysRange.map((date) => {
      const filteredReports = reports.filter((report) => report.date === date);
      return filteredReports[0];
    });
    setFilteredReports(filteredReports.reverse());
  }, [reports, dates]);

  const renderWeekRows = dates.sundaysRange
    .map((date, i) => {
      return <span key={i}>{date.slice(5)}</span>;
    })
    .reverse();

  const renderTableRow = (value) => {
    const rows = filteredReports.map((report, i) => {
      if (value === "total")
        return (
          <span className="bold" key={i}>
            $ {report?.total || 0}
          </span>
        );
      if (value !== "total")
        return <span key={i}>$ {report?.[value].total || 0}</span>;
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
        <div className="flex__vertical">
          <div>
            <header>
              <h3>Weekly Report</h3>
            </header>
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
          <div className="table flex--column home__weekly-report__table">
            <div className="home__weekly-report__row table--header-row table--row">
              <span></span>
              {renderWeekRows}
            </div>

            <div className="home__weekly-report__row table--row">
              <span style={{ fontWeight: 600 }}>Cart.</span>
              {renderTableRow("cartridge")}
            </div>

            <div className="home__weekly-report__row table--row">
              <span style={{ fontWeight: 600 }}>Offer.</span>
              {renderTableRow("offering")}
            </div>

            <div className="home__weekly-report__row table--row">
              <span style={{ fontWeight: 600 }}>Thnks.</span>
              {renderTableRow("thanksGiving")}
            </div>

            <div className="home__weekly-report__row table--row">
              <span style={{ fontWeight: 600 }}>S & W</span>
              {renderTableRow("selfDenial")}
            </div>

            <div className="home__weekly-report__row table--row">
              <span style={{ fontWeight: 600 }}>Build.</span>
              {renderTableRow("buildingFund")}
            </div>

            <div className="home__weekly-report__row table--row">
              <span className="bold">Total</span>
              {renderTableRow("total")}
            </div>
          </div>
        </div>
      </article>
    );
  };

  return render();
};

export default WeeklyReport;
