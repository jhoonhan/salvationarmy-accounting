import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../Loader";
import UserForm from "./UserForm";
import UserInfo from "./UserInfo";
import OrderList from "../order/OrderList";
import uiIcons from "../../assets/images/ui-icons.svg";

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

          <section className="flex__vertical" style={{ paddingRight: "2rem" }}>
            <UserInfo selectedUser={selectedUser} />

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
})(User);
