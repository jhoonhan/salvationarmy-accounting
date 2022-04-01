import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteOrder } from "../actions";
import { capitalizeName, lastFirst } from "./helpers/nameHelper";

const OrderChart = ({ orders, deleteOrder, currentDate, totals, showForm }) => {
  const onClickDelete = (selectedOrder) => {
    if (!showForm) return;
    const filteredOrders = orders.filter((el) => el._id !== selectedOrder._id);
    deleteOrder(selectedOrder._id, filteredOrders);
  };

  const convertOutput = (str) => {
    let output;
    if (str === 0 || str === "0") {
      output = "";
    } else {
      output = `$ ${str.toFixed(2)}`;
    }

    return output;
  };

  const renderOrderRow = orders
    .sort((a, b) => {
      return lastFirst(a.name).localeCompare(lastFirst(b.name));
    })
    .map((el, i) => {
      return (
        <React.Fragment key={i}>
          <div>{i + 1}</div>
          <div>
            {`${capitalizeName(el.lastname)}${
              el.firstname ? `, ${capitalizeName(el.firstname)}` : ""
            }`}
          </div>
          <div>{el.checkNumber}</div>
          <div>{convertOutput(el.amountOffering)}</div>
          <div>{convertOutput(el.amountCartridge)}</div>
          <div>{convertOutput(el.amountThanksgiving)}</div>
          <div>{convertOutput(el.amountSelfDenial)}</div>
          <div>{convertOutput(el.amountBuildingFund)}</div>
          <div>$ {el.total.toFixed(2)}</div>

          <div className="order__chart__delete">
            <span
              onClick={() => onClickDelete(el)}
              style={!showForm ? { display: "none" } : {}}
            >
              X
            </span>
          </div>
        </React.Fragment>
      );
    });

  const render = () => {
    return (
      <>
        <div style={{ marginBottom: "1rem" }}>Date: {currentDate}</div>

        <div className="order__chart">
          <div>
            <div></div>
          </div>
          <div>Name</div>
          <div>Check #</div>
          <div>Offering</div>
          <div>Cartridge</div>
          <div>Thanksgiving</div>
          <div>Self & World</div>
          <div>Building</div>

          <div>Total</div>
          <div></div>
          {renderOrderRow}

          <div></div>
          <div style={{ borderRight: "none" }}></div>
          <div style={{ justifyContent: "end" }}>Subtotal Check:</div>
          <div>$ {totals.offering.check.toFixed(2)}</div>
          <div>$ {totals.cartridge.check.toFixed(2)}</div>
          <div>$ {totals.thanksGiving.check.toFixed(2)}</div>
          <div>$ {totals.selfDenial.check.toFixed(2)}</div>
          <div>$ {totals.buildingFund.check.toFixed(2)}</div>
          <div>$ {totals.subTotalCheck.toFixed(2)}</div>
          <div></div>

          <div></div>
          <div style={{ borderRight: "none" }}></div>
          <div style={{ justifyContent: "end" }}>Subtotal Cash:</div>
          <div>$ {totals.offering.cash.toFixed(2)}</div>
          <div>$ {totals.cartridge.cash.toFixed(2)}</div>
          <div>$ {totals.thanksGiving.cash.toFixed(2)}</div>
          <div>$ {totals.selfDenial.cash.toFixed(2)}</div>
          <div>$ {totals.buildingFund.cash.toFixed(2)}</div>
          <div>$ {totals.subTotalCash.toFixed(2)}</div>
          <div></div>

          <div></div>
          <div style={{ borderRight: "none" }}></div>
          <div style={{ justifyContent: "end" }}>Total:</div>
          <div>$ {totals.offering.total}</div>
          <div>$ {totals.cartridge.total}</div>
          <div>$ {totals.thanksGiving.total}</div>
          <div>$ {totals.selfDenial.total}</div>
          <div>$ {totals.buildingFund.total}</div>
          <div>$ {totals.total.toFixed(2)}</div>
          <div></div>
        </div>
      </>
    );
  };

  return render();
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {
  deleteOrder,
})(OrderChart);
