import React, { useEffect } from "react";

const WeeklyReport = ({ reports, dates }) => {
  useEffect(() => {
    console.log(reports);
  }, []);
  const renderWeekRows = dates.sundaysRange.reverse().map((date, i) => {
    return <span key={i}>{date.slice(5)}</span>;
  });

  const renderTableRow = (value) => {
    dates.sundaysRange.reverse().map((date, i) => {
      const filteredReports = reports.filter((report) => report === date);
      console.log(filteredReports);
      const aang = filteredReports.map((report, i) => {
        console.log(report.total);
        return <span key={i}>{report[value]}</span>;
      });
    });
  };

  const render = () => {
    console.log(dates);
    return (
      <article className="ui__container home__weekly-report">
        <header>
          <h3>Weekly Report</h3>
        </header>
        <div className="flex__vertical">
          <div>
            <div className="chart home__weekly-report__chart">
              <div className="chart__vertical-label">
                <span>$1000</span>
                <span>$900</span>
                <span>$800</span>
                <span>$700</span>
                <span>$600</span>
                <span>$500</span>
                <span>$400</span>
                <span>$300</span>
                <span>$200</span>
                <span>$100</span>
                <span>$0</span>
              </div>
              <div className="chart__graph">
                <div className="chart__bar" style={{ height: "90%" }}></div>
              </div>
              <div className="chart__graph">
                <div className="chart__bar" style={{ height: "20%" }}></div>
              </div>
              <div className="chart__graph">
                <div className="chart__bar" style={{ height: "30%" }}></div>
              </div>
              <div className="chart__graph">
                <div className="chart__bar" style={{ height: "40%" }}></div>
              </div>
              <div className="chart__graph">
                <div className="chart__bar" style={{ height: "50%" }}></div>
              </div>
              <div className="chart__graph">
                <div className="chart__bar" style={{ height: "60%" }}></div>
              </div>
              <div className="chart__graph">
                <div className="chart__bar" style={{ height: "70%" }}></div>
              </div>
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
            <span>$ 1000.00</span>
            <span>$ 980.00</span>
            <span>$ 1140.00</span>
            <span>$ 1200.00</span>
            <span>$ 960.00</span>
            <span>$ 523.00</span>
            <span>$ 990.00</span>

            <span>Offer.</span>
            <span>$ 1000.00</span>
            <span>$ 980.00</span>
            <span>$ 1140.00</span>
            <span>$ 1200.00</span>
            <span>$ 960.00</span>
            <span>$ 523.00</span>
            <span>$ 990.00</span>

            <span>Thnks.</span>
            <span>$ 1000.00</span>
            <span>$ 980.00</span>
            <span>$ 1140.00</span>
            <span>$ 1200.00</span>
            <span>$ 960.00</span>
            <span>$ 523.00</span>
            <span>$ 990.00</span>

            <span>S & W</span>
            <span>$ 1000.00</span>
            <span>$ 980.00</span>
            <span>$ 1140.00</span>
            <span>$ 1200.00</span>
            <span>$ 960.00</span>
            <span>$ 523.00</span>
            <span>$ 990.00</span>

            <span>Build.</span>
            <span>$ 1000.00</span>
            <span>$ 980.00</span>
            <span>$ 1140.00</span>
            <span>$ 1200.00</span>
            <span>$ 960.00</span>
            <span>$ 523.00</span>
            <span>$ 990.00</span>

            <span>Total</span>
            {renderTableRow("total")}
          </div>
        </div>
      </article>
    );
  };

  return render();
};

export default WeeklyReport;
