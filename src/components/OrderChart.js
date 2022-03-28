import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteOrder } from "../actions";

const OrderChart = ({ order, deleteOrder }) => {
  const onClickDelete = (selectedOrder) => {
    const filteredOrders = order.orders.filter(
      (el) => el.id !== selectedOrder.id
    );
    deleteOrder(selectedOrder.id, filteredOrders);
  };

  const renderOrderRow = order.orders.map((el, i) => {
    return (
      <React.Fragment key={i}>
        <div>{el.name}</div>
        <div>{el.amountWeekly}</div>
        <div>{el.amountTithe}</div>
        <div>{el.amountSpecial}</div>
        <div></div>
        <Button onClick={() => onClickDelete(el)} variant="danger">
          X
        </Button>
      </React.Fragment>
    );
  });
  return (
    <>
      <label>Week 12</label>

      <div className="order__chart">
        <div>
          <label>name</label>
        </div>
        <div>
          <label>weekly</label>
        </div>
        <div>
          <label>tithe</label>
        </div>
        <div>
          <label>special</label>
        </div>
        <div>
          <label>aang</label>
        </div>
        <div></div>
        {renderOrderRow}
      </div>
    </>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {
  deleteOrder,
})(OrderChart);
