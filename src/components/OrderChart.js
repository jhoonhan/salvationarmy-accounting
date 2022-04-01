import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteOrder } from "../actions";
import capitalizeName from "./helpers/capitalizeName";

const OrderChart = ({ orders, deleteOrder, currentDate, totals, showForm }) => {
  const onClickDelete = (selectedOrder) => {
    if (!showForm) return;
    const filteredOrders = orders.filter((el) => el._id !== selectedOrder._id);
    deleteOrder(selectedOrder._id, filteredOrders);
  };

  const renderOrderRow = orders
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .map((el, i) => {
      return (
        <React.Fragment key={i}>
          <div>{i + 1}</div>
          <div>{capitalizeName(el.name)}</div>
          <div>{el.checkNumber}</div>

          <div>${el.amountOffering.toFixed(2)}</div>
          <div>${el.amountCartridge.toFixed(2)}</div>
          <div>${el.amountThanksgiving.toFixed(2)}</div>
          <div>${el.amountSelfDenial.toFixed(2)}</div>
          <div>${el.amountBuildingFund.toFixed(2)}</div>
          <div>${el.total.toFixed(2)}</div>

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
          <div>Self Denial</div>
          <div>Building</div>

          <div>Total</div>
          <div></div>
          {renderOrderRow}

          <div></div>
          <div style={{ borderRight: "none" }}></div>
          <div style={{ justifyContent: "end" }}>Subtotal Check:</div>
          <div>${totals.offering.check.toFixed(2)}</div>
          <div>${totals.cartridge.check.toFixed(2)}</div>
          <div>${totals.thanksGiving.check.toFixed(2)}</div>
          <div>${totals.selfDenial.check.toFixed(2)}</div>
          <div>${totals.buildingFund.check.toFixed(2)}</div>
          <div>${totals.subTotalCheck.toFixed(2)}</div>
          <div></div>

          <div></div>
          <div style={{ borderRight: "none" }}></div>
          <div style={{ justifyContent: "end" }}>Subtotal Cash:</div>
          <div>${totals.offering.cash.toFixed(2)}</div>
          <div>${totals.cartridge.cash.toFixed(2)}</div>
          <div>${totals.thanksGiving.cash.toFixed(2)}</div>
          <div>${totals.selfDenial.cash.toFixed(2)}</div>
          <div>${totals.buildingFund.cash.toFixed(2)}</div>
          <div>${totals.subTotalCash.toFixed(2)}</div>
          <div></div>

          <div></div>
          <div style={{ borderRight: "none" }}></div>
          <div style={{ justifyContent: "end" }}>Total:</div>
          <div>${totals.offering.total.toFixed(2)}</div>
          <div>${totals.cartridge.total.toFixed(2)}</div>
          <div>${totals.thanksGiving.total.toFixed(2)}</div>
          <div>${totals.selfDenial.total.toFixed(2)}</div>
          <div>${totals.buildingFund.total.toFixed(2)}</div>
          <div>${totals.total.toFixed(2)}</div>
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
