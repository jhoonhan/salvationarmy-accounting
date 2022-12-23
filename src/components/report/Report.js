import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import UserForm from "../user/UserForm";
import uiIcons from "../../assets/images/ui-icons.svg";
import OrderList from "../order/OrderList";
import Loader from "../Loader";

import { fetchReports, fetchOrders, fetchUsers } from "../../actions";

const Report = ({
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
        <div className="default__col default__col--1"></div>
        <div className="default__col default__col--2">
          <header className="page-title merged-cell">
            <svg viewBox="0 0 25 25" className="ui-icon">
              <use href={`${uiIcons}#account-dark`} className="ui-icon"></use>
            </svg>
            <h2>Users</h2>
          </header>
          <section className="flex__vertical">
            <UserForm
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </section>
          <section className="flex__vertical">
            <div className="ui__container">
              <h3>Generate Reports</h3>
              <select name="year" style={{ height: "4rem" }}>
                <option value={"all"}>All Years</option>
                <option value={2022}>2022</option>
                <option value={2021}>2021</option>
              </select>
              <div className="flex__horizontal">
                <button>For Selected User</button>
                <button>For Every User</button>
              </div>
            </div>

            <OrderList
              users={user.users}
              orders={order.orders}
              selectedUser={selectedUser}
            />
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
})(Report);
