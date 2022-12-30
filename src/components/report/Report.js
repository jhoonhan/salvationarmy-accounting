import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import UserForm from "../user/UserForm";
import Loader from "../Loader";
import GeneratedReport from "./GeneratedReport";
import ReportFilter from "./ReportFilter";

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
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedYear, setSelectedYear] = useState(0);

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
      <>
        <main
          className="order__container"
          style={{ height: "auto", minHeight: "100vh" }}
        >
          <div className="order__container__col order__container__col--1 print-area">
            <GeneratedReport
              users={user.users}
              orders={order.orders}
              selectedUser={selectedUser}
              selectedYear={selectedYear}
            />
          </div>

          <div className="order__container__col order__container__col--2 print-hide-adea">
            <section className="flex__vertical">
              <ReportFilter
                selectedUser={selectedUser}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
              />
              <UserForm
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                hideCreateForm={true}
              />

              <div className="ui__container">
                <label>Print Report</label>
                {selectedUser?.name ? (
                  <button>Print Report for the selected user</button>
                ) : (
                  <button>Print Report for every user</button>
                )}
              </div>
            </section>
          </div>
        </main>
        <p className="page-blockify">aang</p>
      </>
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
