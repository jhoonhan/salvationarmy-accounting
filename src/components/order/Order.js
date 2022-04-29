import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import OrderChart from "./OrderChart";
import OrderForm from "./OrderForm";
import UserForm from "../user/UserForm";
import DateSelector from "../helpers/DateSelector";
import UpdateConfrim from "./UpdateConfrim";
import ErrorSunday from "../errors/ErrorSunday";
import Report from "./Report";
import useGetTotal from "../hooks/useGetTotal";
import Loader from "../Loader";
import useDateSetter from "../hooks/useDateSetter";

import {
  createOrder,
  fetchOrders,
  fetchUsers,
  fetchReports,
  resetForms,
} from "../../actions";

export const Order = ({
  user,
  order,
  report,
  userError,
  fetchOrders,
  fetchUsers,
  fetchReports,
  resetForms,
}) => {
  const [fetched, setFetched] = useState(false);

  const [dates, setDates] = useDateSetter();

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
  }, []);

  useEffect(() => {
    if (!order.fetched) return;
    if (!report.fetched) return;
    setFetched(true);
  }, [order, report, fetched]);

  useEffect(() => {
    resetForms();
    if (new Date(dates.currentDate).getDay() === 6) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [dates]);

  useEffect(() => {
    setSelectedOrders(
      order.orders.filter((el) => el.date === dates.currentDate)
    );
  }, [order, dates]);

  useEffect(() => {
    setCurrentReport(
      report.reports.filter((report) => report.date === dates.currentDate)[0]
    );
    setPrevReport(
      report.reports.filter((report) => report.date === dates.prevDate)[0]
    );
  }, [report, dates]);

  useEffect(() => {
    if (!fetched) return null;
    setShowForm(currentReport ? false : true);
    refPrint.current.scrollTo(0, 0);
  }, [currentReport]);

  const conditionalRender = () => {
    if (userError?.name === "selectSunday") {
      return <ErrorSunday userError={userError} />;
    }
    if (!showForm && dates) {
      return (
        <UpdateConfrim
          setShowForm={setShowForm}
          currentReport={currentReport}
          refPrint={refPrint}
        />
      );
    }
    if (showForm && dates) {
      return (
        <>
          <UserForm
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            // searchTerm={searchTerm}
            // setSearchTerm={setSearchTerm}
            refUserSearch={refUserSearch}
          />

          <OrderForm
            currentDate={dates.currentDate}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            refUserSearch={refUserSearch}
          />
        </>
      );
    }
  };

  const render = () => {
    if (!fetched) return <Loader show={true} />;
    return (
      <div className="order__container">
        <div
          ref={refPrint}
          className="order__container__col order__container__col--1 print-area"
        >
          <h3 className="order__report-title">Kernersville Korean Corps</h3>
          <OrderChart
            users={user.users}
            orders={selectedOrders}
            totals={totals}
            currentDate={dates.currentDate}
            showForm={showForm}
          />
          <Report
            totals={totals}
            orders={selectedOrders}
            currentReport={currentReport}
            prevReport={prevReport}
            currentDate={dates.currentDate}
            prevDate={dates.prevDate}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        </div>
        <div className="order__container__col order__container__col--2 print-hide-adea">
          <div className="order__col--conditional">
            <DateSelector currentDate={dates.currentDate} setDates={setDates} />

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
