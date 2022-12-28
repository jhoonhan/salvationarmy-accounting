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
  const [showReport, setShowReport] = useState(false);

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

  useEffect(() => {
    console.log(selectedUser);

    if (selectedUser?.name) {
      setShowReport(true);
    }
    if (!selectedUser) {
      setShowReport(false);
    }
  }, [selectedUser]);

  const render = () => {
    if (!fetched) return <Loader show={true} />;

    return (
      <main
        className="order__container print-blockify"
        style={{ height: "auto", minHeight: "100vh" }}
      >
        <div className="order__container__col order__container__col--1 print-area print-blockify">
          <GeneratedReport
            users={user.users}
            orders={order.orders}
            selectedUser={selectedUser}
            selectedYear={selectedYear}
            showReport={showReport}
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
