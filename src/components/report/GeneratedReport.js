import React, { useState, useEffect } from "react";

import useGetTotal from "../hooks/useGetTotal";
import useFilterOrders from "../hooks/useFilterOrders";

const GeneratedReport = ({ orders, users, selectedUser, selectedYear }) => {
  const filteredOrders = useFilterOrders({
    orders,
    selectedUser,
    selectedYear,
  });
  const totals = useGetTotal(filteredOrders);
  const [showReport, setShowReport] = useState(false);
  const [sortedOrder, setSortedOrder] = useState([]);
  const [userList, setUserList] = useState([]);

  // Toogle report showing based on if there is selected user
  useEffect(() => {
    selectedUser?.name ? setShowReport(true) : setShowReport(false);

    if (!selectedUser) {
      setSortedOrder(sortOrderByKey(filteredOrders, "userId"));
    } else {
      setSortedOrder(sortOrderByKey(filteredOrders, "userId"));
    }
  }, [selectedUser, filteredOrders]);

  // Change user list based on sorted orders
  useEffect(() => {
    setUserList(Object.keys(sortedOrder));
  }, [sortedOrder]);

  useEffect(() => {
    console.log(sortedOrder);
  }, [sortedOrder]);

  useEffect(() => {
    console.log(userList);
  }, [userList]);

  const convertOutput = (str) => {
    let output;
    if (str === 0 || str === "0") {
      output = "";
    } else {
      output = `$ ${str.toFixed(2)}`;
    }
    return output;
  };

  const sortOrderByKey = (orders, prop) => {
    return orders.reduce((acc, obj) => {
      // console.log(acc);
      const key = obj[prop];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  };

  const renderEmptyRow = () => {
    if (filteredOrders.length > 25) return null;
    let arr = [];
    for (let i = filteredOrders.length + 1; i <= 25; i++) {
      arr.push(i);
    }
    return arr.map((el) => {
      return (
        <React.Fragment key={el}>
          <div className="chart__empty-row">{el}</div>
          <div className="chart__empty-row"></div>
          <div className="chart__empty-row"></div>
          <div className="chart__empty-row"></div>
          <div className="chart__empty-row"></div>
          <div className="chart__empty-row"></div>
          <div className="chart__empty-row"></div>
          <div className="chart__empty-row"></div>
          <div className="chart__empty-row"></div>
          <div className="chart__empty-row"></div>
        </React.Fragment>
      );
    });
  };
  const renderOrderRow = (orders) => {
    return orders.map((order, i) => {
      return (
        <React.Fragment key={i}>
          <div>{i + 1}</div>
          <div>{order.date}</div>
          <div>{order.checkNumber}</div>
          <div>{convertOutput(order.amountCartridge)}</div>
          <div>{convertOutput(order.amountOffering)}</div>
          <div>{convertOutput(order.amountThanksgiving)}</div>
          <div>{convertOutput(order.amountSelfDenial)}</div>
          <div>{convertOutput(order.amountBuildingFund)}</div>
          <div>$ {order.total.toFixed(2)}</div>
          <div></div>
        </React.Fragment>
      );
    });
  };

  const renderTableByUser = (userIds, orders) => {
    return userIds.map((id) => {
      return (
        <>
          <div
            className="flex__vertical"
            style={{
              minHeight: "500px",
              backgroundColor: "white",
            }}
          >
            <label>Generated Report</label>
            <div className="order__chart">
              <div>
                <div></div>
              </div>
              <div>Date</div>
              <div>Check #</div>
              <div>Cartridge</div>
              <div>Offering</div>
              <div>Thanksgiving</div>
              <div>Self & World</div>
              <div>Building</div>

              <div>Total</div>
              <div></div>
              {showReport && renderOrderRow(orders[id])}
              {renderEmptyRow()}

              <div></div>
              <div style={{ borderRight: "none" }}></div>
              <div style={{ justifyContent: "end" }}>Subtotal Check:</div>
              <div>$ {showReport ? totals.cartridge.check.toFixed(2) : 0}</div>
              <div>$ {showReport ? totals.offering.check.toFixed(2) : 0}</div>
              <div>
                $ {showReport ? totals.thanksGiving.check.toFixed(2) : 0}
              </div>
              <div>$ {showReport ? totals.selfDenial.check.toFixed(2) : 0}</div>
              <div>
                $ {showReport ? totals.buildingFund.check.toFixed(2) : 0}
              </div>
              <div>$ {showReport ? totals.subTotalCheck.toFixed(2) : 0}</div>
              <div></div>

              <div></div>
              <div style={{ borderRight: "none" }}></div>
              <div style={{ justifyContent: "end" }}>Subtotal Cash:</div>
              <div>$ {showReport ? totals.cartridge.cash.toFixed(2) : 0}</div>
              <div>$ {showReport ? totals.offering.cash.toFixed(2) : 0}</div>
              <div>
                $ {showReport ? totals.thanksGiving.cash.toFixed(2) : 0}
              </div>
              <div>$ {showReport ? totals.selfDenial.cash.toFixed(2) : 0}</div>
              <div>
                $ {showReport ? totals.buildingFund.cash.toFixed(2) : 0}
              </div>
              <div>$ {showReport ? totals.subTotalCash.toFixed(2) : 0}</div>
              <div></div>

              <div></div>
              <div style={{ borderRight: "none" }}></div>
              <div style={{ justifyContent: "end" }}>Total:</div>
              <div>$ {showReport ? totals.cartridge.total.toFixed(2) : 0}</div>
              <div>$ {showReport ? totals.offering.total.toFixed(2) : 0}</div>
              <div>
                $ {showReport ? totals.thanksGiving.total.toFixed(2) : 0}
              </div>
              <div>$ {showReport ? totals.selfDenial.total.toFixed(2) : 0}</div>
              <div>
                $ {showReport ? totals.buildingFund.total.toFixed(2) : 0}
              </div>
              <div>$ {showReport ? totals.total.toFixed(2) : 0}</div>
              <div></div>
            </div>
          </div>
          <div className="page-break">break</div>
        </>
      );
    });
  };

  const renderTable = () => {
    return (
      <>
        <div
          className="flex__vertical"
          style={{
            minHeight: "500px",
            backgroundColor: "white",
          }}
        >
          <label>Generated Report</label>
          <div className="order__chart">
            <div>
              <div></div>
            </div>
            <div>Date</div>
            <div>Check #</div>
            <div>Cartridge</div>
            <div>Offering</div>
            <div>Thanksgiving</div>
            <div>Self & World</div>
            <div>Building</div>

            <div>Total</div>
            <div></div>
            {showReport && renderOrderRow(filteredOrders)}
            {renderEmptyRow()}

            <div></div>
            <div style={{ borderRight: "none" }}></div>
            <div style={{ justifyContent: "end" }}>Subtotal Check:</div>
            <div>$ {showReport ? totals.cartridge.check.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.offering.check.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.thanksGiving.check.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.selfDenial.check.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.buildingFund.check.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.subTotalCheck.toFixed(2) : 0}</div>
            <div></div>

            <div></div>
            <div style={{ borderRight: "none" }}></div>
            <div style={{ justifyContent: "end" }}>Subtotal Cash:</div>
            <div>$ {showReport ? totals.cartridge.cash.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.offering.cash.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.thanksGiving.cash.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.selfDenial.cash.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.buildingFund.cash.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.subTotalCash.toFixed(2) : 0}</div>
            <div></div>

            <div></div>
            <div style={{ borderRight: "none" }}></div>
            <div style={{ justifyContent: "end" }}>Total:</div>
            <div>$ {showReport ? totals.cartridge.total.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.offering.total.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.thanksGiving.total.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.selfDenial.total.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.buildingFund.total.toFixed(2) : 0}</div>
            <div>$ {showReport ? totals.total.toFixed(2) : 0}</div>
            <div></div>
          </div>
        </div>
        <div className="page-break">break</div>
      </>
    );
  };

  const render = () => {
    return <>{renderTable()}</>;
    // return <>{renderTableByUser(userList, sortedOrder)}</>;
  };

  return render();
};

export default GeneratedReport;
