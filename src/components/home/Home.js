import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
  const [fetched, setFetched] = useState(false);
  const [dates, setDates] = useDateSetter();
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
      <main className="default__container home__container">
        <div className="default__col default__col--1"></div>
        <div className="default__col default__col--2">
          <header className="page-title merged-cell">
            <h2>Home</h2>
            <p>Kernersville Korean Corps</p>
          </header>
          <section className="flex__vertical">
            <DateSelector currentDate={dates.currentDate} setDates={setDates} />
            <WeeklyReport reports={report.reports} dates={dates} />
          </section>

          <section className="flex__vertical">
            <HeroStats homeData={homeData} dates={dates} />
            <Stats reports={report.reports} users={user.users} />
            <Activity orders={order.orders} users={user.users} />
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
//
