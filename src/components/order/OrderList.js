import React, { useEffect, useState } from "react";
import OrderDeleteButton from "./OrderDeleteButton";
import {
  capitalizeName,
  firstExtendLastInitial,
  getName,
} from "../helpers/nameHelper";

const OrderList = ({ users, orders, selectedUser, selectedYear }) => {
  const [filteredOrders, setFilteredOrders] = useState(orders.reverse());

  // When Selected user is changed
  useEffect(() => {
    let result = orders;
    // if (!selectedUser._id) return;
    // const filtered = orders
    //   .filter((order) => order.userId === selectedUser._id)
    //   .reverse();
    // setFilteredOrders(filtered);

    if (selectedUser._id) {
      const filtered = orders
        .filter((order) => order.userId === selectedUser._id)
        .reverse();
      result = filtered;
    }

    if (selectedYear) {
      const filtered = result.filter(
        (order) => order.date.split("-")[0] === `${selectedYear}`
      );
      result = filtered;
    }
    console.log(selectedUser);

    setFilteredOrders(result);
  }, [selectedUser, selectedYear, orders]);

  const getTotal = () => {
    const total = filteredOrders.reduce((a, b) => a + b.total, 0);
    return total.toFixed(2);
  };

  const renderRows = () => {
    const rows = filteredOrders.map((order) => {
      return (
        <div key={order._id} className="order-list__table--row row">
          <span>{order.date}</span>
          <span>
            {capitalizeName(firstExtendLastInitial(getName(users, order).name))}
          </span>
          <span>$ {order.total.toFixed(2)}</span>
        </div>
      );
    });
    return rows;
  };

  const render = () => {
    return (
      <div className="ui__container">
        <div className="flex--column" style={{ width: "100%", gap: "0rem" }}>
          <h3>contributions</h3>
          <div className="grid--column--2--eq">
            <div className="flex--row" style={{ gap: "1rem", fontWeight: 600 }}>
              <p>Total</p>
              <p>:</p>
              <p>$ {getTotal()}</p>
            </div>
          </div>
          <div
            className="order-list__table table scroll-list--hover"
            style={{ width: "100%" }}
          >
            {renderRows()}
          </div>
        </div>
      </div>
    );
  };
  return render();
};

export default OrderList;
