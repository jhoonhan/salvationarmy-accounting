import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import DateSelector from "../helpers/DateSelector";
import useDateSetter from "../hooks/useDateSetter";
import WeeklyReport from "./WeeklyReport";
import HeroStats from "./HeroStats";
import Stats from "./Stats";
import Activity from "./Activity";
import Loader from "../Loader";
import useGetHomeData from "./useGetHomeData";

import { fetchReports, fetchOrders, fetchUsers } from "../../actions";

const Home = ({
  user,
  order,
  report,
  fetchOrders,
  fetchUsers,
  fetchReports,
}) => {
  const [dates, setDates] = useDateSetter();
  const [fetched, setFetched] = useState(false);
  const homeData = useGetHomeData(report.reports, dates);

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchReports();
  }, []);

  useEffect(() => {
    if (!user.fetched) return;
    if (!order.fetched) return;
    if (!report.fetched) return;
    setFetched(true);
  }, [user, order, report, fetched]);

  const render = () => {
    if (!fetched) return <Loader show={true} />;
    return (
      <main className="home__container">
        <div className="home__col home__col--1">
          <div className="nav__side__profile">profile</div>
          <nav className="nav__side">
            <ul>
              <li>Home</li>
              <li>Reports</li>
              <li>Users</li>
              <li>Orders</li>
            </ul>
          </nav>
        </div>
        <div className="home__col home__col--2">
          <section className="flex__vertical">
            <DateSelector currentDate={dates.currentDate} setDates={setDates} />
            <WeeklyReport reports={report.reports} dates={dates} />
          </section>

          <section className="flex__vertical">
            <HeroStats homeData={homeData} dates={dates} />
            <Stats reports={report.reports} />
            <Activity orders={order.orders} />
          </section>
        </div>
      </main>
    );
  };

  return render();
};

const mapStateToProps = ({ user, order, report, userError }) => {
  return {
    user,
    order,
    report,
    userError,
  };
};

export default connect(mapStateToProps, {
  fetchOrders,
  fetchUsers,
  fetchReports,
})(Home);
