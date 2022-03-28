import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import OrderChart from "./OrderChart";
import OrderForm from "./OrderForm";
import UserForm from "./UserForm";
import UserSearch from "./UserSearch";
import DateSelector from "./DateSelector";

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
        <div className="order__container__col">
          <OrderChart
            orders={order.orders.filter((el) => el.date === currentDate)}
            currentDate={currentDate}
          />
        </div>
        <div className="order__container__col">
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
