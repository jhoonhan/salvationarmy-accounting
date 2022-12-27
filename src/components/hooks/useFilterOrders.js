import React, { useState, useEffect } from "react";

const useFilterOrders = ({ orders, selectedUser, selectedYear }) => {
  const [filteredOrders, setFilteredOrders] = useState(orders.reverse());

  // When Selected user or year is changed
  useEffect(() => {
    let result = orders;

    if (selectedUser?._id) {
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
    setFilteredOrders(result);
  }, [selectedUser, selectedYear, orders]);

  return filteredOrders;
};

export default useFilterOrders;
