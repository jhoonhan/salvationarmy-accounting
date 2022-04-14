import React from "react";
import { connect } from "react-redux";

import { deleteOrder } from "../../actions";

const OrderDeleteButton = ({ order, orders, deleteOrder }) => {
  const onClickDelete = () => {
    console.log(order);
    const filteredOrders = orders.filter((el) => el._id !== order._id);
    deleteOrder(order._id, filteredOrders);
  };
  return <span onClick={() => onClickDelete()}>X</span>;
};

const mapStateToProps = ({ userError }) => {
  return {
    userError,
  };
};

export default connect(mapStateToProps, {
  deleteOrder,
})(OrderDeleteButton);
