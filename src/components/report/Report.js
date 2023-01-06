import React, { useEffect, useState, useRef } from "react";

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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [customReport, setCustomReport] = useState(false);

  const refPrint = useRef(null);

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

  // useEffect(() => {
  //   console.log(selectedUser);
  // }, [selectedUser]);

  const onClickPrint = () => {
    refPrint.current.scrollTo(0, 0);
    window.print();
  };

  const render = () => {
    if (!fetched) return <Loader show={true} />;

    return (
      <main className=" order__container report__container print__blockify">
        <div
          className="report__container__report order__container__col order__container__col--1 print-area"
          ref={refPrint}
        >
          <GeneratedReport
            users={user.users}
            orders={order.orders}
            selectedUser={selectedUser}
            selectedYear={selectedYear}
            customReport={customReport}
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
              <div>
                <label>Generate Report</label>
                <p>Use this option to create a custom report letter</p>
              </div>
              <div className="button-container--horizontal">
                <button
                  className={customReport ? "" : "active"}
                  onClick={() => {
                    setCustomReport(false);
                    setSelectedUser("custom");
                  }}
                >
                  Generated Report
                </button>
                <button
                  className={customReport ? "active" : ""}
                  onClick={() => {
                    setCustomReport(true);
                    setSelectedUser(null);
                  }}
                >
                  Custom Report
                </button>
              </div>
              <button onClick={onClickPrint}>Print Report</button>
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
