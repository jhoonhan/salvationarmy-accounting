import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import { connect } from "react-redux";
import OrderChart from "./OrderChart";
import OrderForm from "./OrderForm";
import UserForm from "./UserForm";
import DateSelector from "./DateSelector";
import UpdateConfrim from "./UpdateConfrim";
import ErrorSunday from "./ErrorSunday";
import Report from "./Report";
import useGetTotal from "./useGetTotal";

import {
  createOrder,
  fetchOrders,
  fetchUsers,
  fetchReports,
  resetForms,
} from "../actions";

export const Order = ({
  order,
  report,
  userError,
  fetchOrders,
  fetchUsers,
  fetchReports,
  resetForms,
}) => {
  const [fetched, setFetched] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentDate, setCurrentDate] = useState(null);
  const [prevDate, setPrevDate] = useState(null);

  const [selectedUser, setSelectedUser] = useState({});
  const [selectedOrders, setSelectedOrders] = useState([]);

  const [currentReport, setCurrentReport] = useState(null);
  const [prevReport, setPrevReport] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const refPrint = useRef(null);
  const refUserSearch = useRef(null);

  const totals = useGetTotal(selectedOrders);

  useEffect(() => {
    fetchOrders();
    fetchUsers();
    fetchReports();

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastSunday = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const prevSunday = new Date(
      today.setDate(today.getDate() - today.getDay() - 7)
    );
    setCurrentDate(lastSunday.toISOString().split("T")[0]);
    setPrevDate(prevSunday.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (!order.fetched) return;
    if (!report.fetched) return;
    setFetched(true);
  }, [order, report, fetched]);

  useEffect(() => {
    resetForms();
  }, [currentDate]);

  useEffect(() => {
    setSelectedOrders(order.orders.filter((el) => el.date === currentDate));
  }, [order, currentDate]);

  useEffect(() => {
    setCurrentReport(
      report.reports.filter((report) => report.date === currentDate)[0]
    );
    setPrevReport(
      report.reports.filter((report) => report.date === prevDate)[0]
    );
  }, [report, currentDate, prevDate]);

  useEffect(() => {
    const now = new Date(currentDate);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const prevSunday = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    setPrevDate(prevSunday.toISOString().split("T")[0]);
  }, [currentDate]);

  useEffect(() => {
    if (!fetched) return null;
    setShowForm(currentReport ? false : true);
    refPrint.current.scrollTo(0, 0);
  }, [currentReport]);

  const conditionalRender = () => {
    if (userError?.name === "selectSunday") {
      return <ErrorSunday userError={userError} />;
    }
    if (!showForm && currentDate) {
      return (
        <UpdateConfrim
          setShowForm={setShowForm}
          currentReport={currentReport}
          refPrint={refPrint}
        />
      );
    }
    if (showForm && currentDate) {
      return (
        <>
          <UserForm
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            refUserSearch={refUserSearch}
          />

          <OrderForm
            currentDate={currentDate}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setSearchTerm={setSearchTerm}
            refUserSearch={refUserSearch}
          />
        </>
      );
    }
  };

  const render = () => {
    if (!fetched) return null;
    return (
      <div className="order__container">
        <div
          ref={refPrint}
          className="order__container__col order__container__col--1 print-area"
        >
          <h4 className="order__report-title">Kernersville Korean Corps</h4>
          <OrderChart
            orders={selectedOrders}
            totals={totals}
            currentDate={currentDate}
            showForm={showForm}
          />
          <Report
            totals={totals}
            orders={selectedOrders}
            currentReport={currentReport}
            prevReport={prevReport}
            currentDate={currentDate}
            prevDate={prevDate}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        </div>
        <div className="order__container__col print-hide-adea">
          <div className="order__col--conditional">
            <DateSelector
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />

            {conditionalRender()}
          </div>
        </div>
      </div>
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
  createOrder,
  fetchOrders,
  fetchUsers,
  fetchReports,
  resetForms,
})(Order);
