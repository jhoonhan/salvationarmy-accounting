import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import { connect } from "react-redux";
import OrderChart from "./OrderChart";
import OrderForm from "./OrderForm";
import UserForm from "./UserForm";
import UserSearch from "./UserSearch";
import DateSelector from "./DateSelector";
import Report from "./Report";
import useGetTotal from "./useGetTotal";

import { createOrder, fetchOrders, fetchUsers, fetchReports } from "../actions";

export const Order = ({
  user,
  order,
  report,
  createOrder,
  fetchOrders,
  fetchUsers,
  fetchReports,
}) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
  const prevSunday = new Date(
    today.setDate(today.getDate() - today.getDay() - 7)
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState(
    lastSunday.toISOString().split("T")[0]
  );
  const [prevDate, setPrevDate] = useState(
    prevSunday.toISOString().split("T")[0]
  );
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentReport, setCurrentReport] = useState([]);
  const [prevReport, setPrevReport] = useState([]);

  const refPrint = useRef(null);
  const totals = useGetTotal(selectedOrders);

  // useEffect(() => {
  //   const now = new Date();
  //   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //   const lastSunday = new Date(
  //     today.setDate(today.getDate() - today.getDay())
  //   );
  //   const prevSunday = new Date(
  //     today.setDate(today.getDate() - today.getDay() - 7)
  //   );
  //   setCurrentDate(lastSunday.toISOString().split("T")[0]);
  // }, []);

  useEffect(() => {
    fetchOrders();
    fetchUsers();
    fetchReports();
  }, []);

  useEffect(() => {
    setSelectedOrders(order.orders.filter((el) => el.date === currentDate));
  }, [order, currentDate]);

  useEffect(() => {
    setCurrentReport(
      report.reports.filter((report) => report.date === currentDate)
    );
    setPrevReport(report.reports.filter((report) => report.date === prevDate));
  }, [report, currentDate, prevDate]);

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const prevSunday = new Date(
      today.setDate(today.getDate() - today.getDay() - 7)
    );
    setPrevDate(prevSunday.toISOString().split("T")[0]);
  }, [currentDate]);

  const render = () => {
    return (
      <div className="order__container">
        <div ref={refPrint} className="order__container__col print-area">
          <div onClick={window.print}>print</div>
          <OrderChart
            orders={selectedOrders}
            totals={totals}
            currentDate={currentDate}
          />
          <Report
            totals={totals}
            orders={selectedOrders}
            currentReport={currentReport}
            prevReport={prevReport}
            currentDate={currentDate}
            prevDate={prevDate}
          />
        </div>
        <div className="order__container__col print-hide-adea">
          <DateSelector setCurrentDate={setCurrentDate} />
          <UserSearch
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <OrderForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            selectedUser={selectedUser}
          />

          <UserForm />
        </div>
      </div>
    );
  };
  return render();
};

const mapStateToProps = ({ user, order, report }) => {
  return {
    user,
    order,
    report,
  };
};

export default connect(mapStateToProps, {
  createOrder,
  fetchOrders,
  fetchUsers,
  fetchReports,
})(Order);
