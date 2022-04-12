import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../Loader";
import UserForm from "./UserForm";

import { fetchReports, fetchOrders, fetchUsers } from "../../actions";

const User = ({
  user,
  order,
  report,
  fetchReports,
  fetchOrders,
  fetchUsers,
}) => {
  const [fetched, setFetched] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

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
          <header className="page-title merged-cell">
            <h2>Users</h2>
          </header>
          <section className="flex__vertical" style={{ height: "100vh" }}>
            <UserForm
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </section>

          <section className="flex__vertical" style={{ paddingRight: "2rem" }}>
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
