import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import UserForm from "../user/UserForm";
import uiIcons from "../../assets/images/ui-icons.svg";
import OrderList from "../order/OrderList";
import Loader from "../Loader";
import GeneratedReport from "./GeneratedReport";

import { capitalizeName } from "../helpers/nameHelper";
import useFilterOrders from "../hooks/useFilterOrders";

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

  const [selectedYear, setSelectedYear] = useState(false);

  const filteredOrders = useFilterOrders({
    orders: order.orders,
    selectedUser,
    selectedYear,
  });

  // Init fecthe validate
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
      <main
        className="default__container user__container"
        style={{ height: "auto" }}
      >
        <div className="default__col default__col--1"></div>
        <div className="default__col default__col--2">
          <header className="page-title merged-cell">
            <svg viewBox="0 0 25 25" className="ui-icon">
              <use href={`${uiIcons}#account-dark`} className="ui-icon"></use>
            </svg>
            <h2>Reports</h2>
          </header>
          <section className="flex__vertical">
            <UserForm
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </section>
          <section className="flex__vertical">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
              }}
            >
              {/* Year Selector */}
              <div className="ui__container">
                <div className="flex__vertical--nogap">
                  <label>Select a Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    name="year"
                    style={{ height: "4rem" }}
                  >
                    <option value={0}>All Years</option>
                    <option value={2022}>2022</option>
                    <option value={2021}>2021</option>
                  </select>
                </div>
              </div>

              {/* Selected User */}
              <div className="ui__container">
                <div className="flex__vertical--nogap">
                  <label>Selected User</label>
                  <p
                    style={{
                      height: "4rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {selectedUser.name
                      ? `${
                          selectedUser.nameK && selectedUser.nameK
                        } / ${capitalizeName(selectedUser.name)}`
                      : "Everyone"}
                  </p>
                </div>
              </div>
            </div>

            <OrderList
              users={user.users}
              orders={filteredOrders}
              selectedUser={selectedUser}
              selectedYear={selectedYear}
            />

            <button>Generate Report</button>
          </section>
          <section
            className="flex__vertical merged-cell"
            style={{ minHeight: "500px", backgroundColor: "white" }}
          >
            <label>Generated Report</label>
            <GeneratedReport user={selectedUser} orders={filteredOrders} />
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
