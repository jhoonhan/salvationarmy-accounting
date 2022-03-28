import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import OrderChart from "./OrderChart";
import OrderForm from "./OrderForm";

import { createOrder, fetchOrders, deleteOrder, fetchUsers } from "../actions";

export const User = ({ user, order, createOrder, fetchOrders, fetchUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

  const render = () => {
    return (
      <div className="order__container">
        <div className="order__container__col">
          <OrderChart order={order} deleteOrder={deleteOrder} />
        </div>
        <div className="order__container__col">
          <OrderForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
  deleteOrder,
  fetchUsers,
})(User);
