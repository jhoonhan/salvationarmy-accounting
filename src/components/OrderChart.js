import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteOrder } from "../actions";

const OrderChart = ({ order, currentDate, deleteOrder }) => {
  const onClickDelete = (selectedOrder) => {
    console.log(order);
    const filteredOrders = order.orders.filter(
      (el) => el.id !== selectedOrder.id
    );
    deleteOrder(selectedOrder.id, filteredOrders);
  };

  const renderOrderRow = order.orders
    .filter((el) => el.date === currentDate)
    .sort((a, b) => {
      let results;
      if (!a.nameK) {
        results = a.name.localeCompare(b.name);
      } else {
        results = a.nameK.localeCompare(b.nameK);
      }
      return results;
    })
    .map((el, i) => {
      return (
        <React.Fragment key={i}>
          <div>{el.nameK ? el.nameK : el.name}</div>
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
