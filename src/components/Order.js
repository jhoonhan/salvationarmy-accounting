import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import OrderChart from "./OrderChart";
import OrderForm from "./OrderForm";
import UserForm from "./UserForm";

import { createOrder, fetchOrders, fetchUsers } from "../actions";

export const User = ({ user, order, createOrder, fetchOrders, fetchUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState(null);

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
          />
        </div>
        <div className="order__container__col">
          <OrderForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
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
    initialValues: {
      amount: 0,
    },
    user,
    order,
  };
};

export default connect(mapStateToProps, {
  createOrder,
  fetchOrders,
  fetchUsers,
})(User);
