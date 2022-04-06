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
import useDateSetter from "../helpers/useDateSetter";

import {
  createOrder,
  fetchOrders,
  fetchUsers,
  fetchReports,
  resetForms,
} from "../../actions";

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

  const [dates, setDates] = useDateSetter();
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

    // const now = new Date();
    // const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // const lastSunday = new Date(
    //   today.setDate(today.getDate() - today.getDay())
    // );
    // const prevSunday = new Date(
    //   today.setDate(today.getDate() - today.getDay() - 7)
    // );
    // setCurrentDate(lastSunday.toISOString().split("T")[0]);
    // setPrevDate(prevSunday.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (!order.fetched) return;
    if (!report.fetched) return;
    setFetched(true);
  }, [order, report, fetched]);

  useEffect(() => {
    resetForms();
    if (new Date(dates[0]).getDay() === 6) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [dates]);

  useEffect(() => {
    setSelectedOrders(order.orders.filter((el) => el.date === dates[0]));
  }, [order, dates]);

  useEffect(() => {
    setCurrentReport(
      report.reports.filter((report) => report.date === dates[0])[0]
    );
    setPrevReport(
      report.reports.filter((report) => report.date === dates[1])[0]
    );
  }, [report, dates]);

  // useEffect(() => {
  //   const now = new Date(dates[0]);
  //   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //   const prevSunday = new Date(
  //     today.setDate(today.getDate() - today.getDay())
  //   );
  //   setPrevDate(prevSunday.toISOString().split("T")[0]);
  // }, [dates]);

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
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            refUserSearch={refUserSearch}
          />

          <OrderForm
            currentDate={dates[0]}
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
    if (!fetched) return <Loader show={true} />;
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
            currentDate={dates[0]}
            showForm={showForm}
          />
          <Report
            totals={totals}
            orders={selectedOrders}
            currentReport={currentReport}
            prevReport={prevReport}
            currentDate={dates[0]}
            prevDate={dates[1]}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        </div>
        <div className="order__container__col order__container__col--2 print-hide-adea">
          <div className="order__col--conditional">
            <DateSelector currentDate={dates[0]} setDates={setDates} />

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
