import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import { connect } from "react-redux";
import OrderChart from "./OrderChart";
import OrderForm from "./OrderForm";
import UserForm from "./UserForm";
import UserSearch from "./UserSearch";
import DateSelector from "./DateSelector";
import AdditionalForm from "./AdditionalForm";

import { createOrder, fetchOrders, fetchUsers } from "../actions";

export const Order = ({
  user,
  order,
  createOrder,
  fetchOrders,
  fetchUsers,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState({});
  const refPrint = useRef(null);

  useEffect(() => {
    let prevSunday = new Date();
    prevSunday.setDate(prevSunday.getDate() - ((prevSunday.getDay() + 7) % 7));
    setCurrentDate(prevSunday.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  const render = () => {
    return (
      <div className="order__container">
        <div ref={refPrint} className="order__container__col print-area">
          <div onClick={window.print}>print</div>
          <OrderChart
            orders={order.orders.filter((el) => el.date === currentDate)}
            currentDate={currentDate}
          />
          <AdditionalForm />
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

const mapStateToProps = ({ user, form, order }) => {
  return {
    user,
    order,
  };
};

export default connect(mapStateToProps, {
  createOrder,
  fetchOrders,
  fetchUsers,
})(Order);
