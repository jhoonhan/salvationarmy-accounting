import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../Loader";
import UserList from "./UserList";

import { fetchReports, fetchOrders, fetchUsers } from "../../actions";
import UserSearch from "./UserSearch";

const User = ({
  user,
  order,
  report,
  fetchReports,
  fetchOrders,
  fetchUsers,
}) => {
  const [fetched, setFetched] = useState(false);

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
      <main className="default__container user__container">
        <div className="default__col default__col--1">
          <div className="nav__side__profile">profile</div>
          <nav className="nav__side">
            <Link to="/" className="link">
              home
            </Link>
            <Link to="/order" className="link">
              reports
            </Link>
            <Link to="/user" className="link">
              user
            </Link>
            <Link to="/" className="link">
              orders
            </Link>
          </nav>
        </div>
        <div className="default__col default__col--2">
          <section className="flex__vertical" style={{ height: "100vh" }}>
            {/* <UserSearch users={user.users} /> */}
          </section>

          <section className="flex__vertical" style={{ paddingRight: "2rem" }}>
            <header className="page-title" style={{ paddingBottom: 0 }}>
              <h2>Users</h2>
            </header>
            <div className="ui__container">aaang</div>
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
  fetchReports,
  fetchOrders,
  fetchUsers,
})(User);
