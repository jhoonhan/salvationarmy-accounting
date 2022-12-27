import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import UserForm from "../user/UserForm";
import uiIcons from "../../assets/images/ui-icons.svg";
import OrderList from "../order/OrderList";
import Loader from "../Loader";
import GeneratedReport from "./GeneratedReport";
import ReportFilter from "./ReportFilter";

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
  const [selectedYear, setSelectedYear] = useState(0);
  const [showReport, setShowReport] = useState(false);

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

  useEffect(() => {
    if (selectedUser?.name) {
      setShowReport(true);
    }
  }, [selectedUser]);

  const render = () => {
    if (!fetched) return <Loader show={true} />;

    return (
      <main
        className="order__container"
        style={{ height: "auto", minHeight: "100vh" }}
      >
        <div className="order__container__col order__container__col--1 print-area">
          <section
            className="flex__vertical merged-cell"
            style={{ minHeight: "500px", backgroundColor: "white" }}
          >
            <label>Generated Report</label>
            <GeneratedReport
              user={selectedUser}
              orders={filteredOrders}
              showReport={showReport}
            />
          </section>
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

            {/* <OrderList
              users={user.users}
              orders={order.orders}
              selectedUser={selectedUser}
              selectedYear={selectedYear}
            /> */}
            <button>Generate Report</button>
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
