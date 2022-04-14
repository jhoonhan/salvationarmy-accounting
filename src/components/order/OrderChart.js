import React from "react";
import { connect } from "react-redux";
import { capitalizeName, lastFirstExt, getName } from "../helpers/nameHelper";
import OrderDeleteButton from "./OrderDeleteButton";

const OrderChart = ({ users, orders, currentDate, totals, showForm }) => {
  const convertOutput = (str) => {
    let output;
    if (str === 0 || str === "0") {
      output = "";
    } else {
      output = `$ ${str.toFixed(2)}`;
    }

    return output;
  };

  const renderEmptyRow = () => {
    if (orders.length > 25) return null;
    let arr = [];
    for (let i = orders.length + 1; i <= 25; i++) {
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
  const renderOrderRow = orders
    // .sort((a, b) => {
    //   return lastFirst(a.name).localeCompare(lastFirst(b.name));
    // })
    .map((order, i) => {
      return (
        <React.Fragment key={i}>
          <div>{i + 1}</div>
          <div>{capitalizeName(lastFirstExt(getName(users, order).name))}</div>
          <div>{order.checkNumber}</div>
          <div>{convertOutput(order.amountCartridge)}</div>
          <div>{convertOutput(order.amountOffering)}</div>
          <div>{convertOutput(order.amountThanksgiving)}</div>
          <div>{convertOutput(order.amountSelfDenial)}</div>
          <div>{convertOutput(order.amountBuildingFund)}</div>
          <div>$ {order.total.toFixed(2)}</div>

          <div className="row__delete">
            {showForm ? (
              <OrderDeleteButton order={order} orders={orders} />
            ) : (
              ""
            )}
          </div>
        </React.Fragment>
      );
    });

  const render = () => {
    return (
      <>
        <div style={{ marginBottom: "0.5rem" }}>Date: {currentDate}</div>

        <div className="order__chart">
          <div>
            <div></div>
          </div>
          <div>Name</div>
          <div>Check #</div>
          <div>Cartridge</div>
          <div>Offering</div>
          <div>Thanksgiving</div>
          <div>Self & World</div>
          <div>Building</div>

          <div>Total</div>
          <div></div>
          {renderOrderRow}
          {renderEmptyRow()}

          <div></div>
          <div style={{ borderRight: "none" }}></div>
          <div style={{ justifyContent: "end" }}>Subtotal Check:</div>
          <div>$ {totals.cartridge.check.toFixed(2)}</div>
          <div>$ {totals.offering.check.toFixed(2)}</div>
          <div>$ {totals.thanksGiving.check.toFixed(2)}</div>
          <div>$ {totals.selfDenial.check.toFixed(2)}</div>
          <div>$ {totals.buildingFund.check.toFixed(2)}</div>
          <div>$ {totals.subTotalCheck.toFixed(2)}</div>
          <div></div>

          <div></div>
          <div style={{ borderRight: "none" }}></div>
          <div style={{ justifyContent: "end" }}>Subtotal Cash:</div>
          <div>$ {totals.cartridge.cash.toFixed(2)}</div>
          <div>$ {totals.offering.cash.toFixed(2)}</div>
          <div>$ {totals.thanksGiving.cash.toFixed(2)}</div>
          <div>$ {totals.selfDenial.cash.toFixed(2)}</div>
          <div>$ {totals.buildingFund.cash.toFixed(2)}</div>
          <div>$ {totals.subTotalCash.toFixed(2)}</div>
          <div></div>

          <div></div>
          <div style={{ borderRight: "none" }}></div>
          <div style={{ justifyContent: "end" }}>Total:</div>
          <div>$ {totals.cartridge.total.toFixed(2)}</div>
          <div>$ {totals.offering.total.toFixed(2)}</div>
          <div>$ {totals.thanksGiving.total.toFixed(2)}</div>
          <div>$ {totals.selfDenial.total.toFixed(2)}</div>
          <div>$ {totals.buildingFund.total.toFixed(2)}</div>
          <div>$ {totals.total.toFixed(2)}</div>
          <div></div>
        </div>
      </>
    );
  };

  return render();
};

export default OrderChart;
