import React from "react";
import { connect } from "react-redux";
import { deleteOrder } from "../actions";

const OrderChart = ({ orders, deleteOrder, currentDate, totals }) => {
  const onClickDelete = (selectedOrder) => {
    const filteredOrders = orders.filter((el) => el.id !== selectedOrder.id);
    deleteOrder(selectedOrder.id, filteredOrders);
  };

  const renderOrderRow = orders
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
          <div>{i + 1}</div>
          <div>{el.nameK ? el.nameK : el.name}</div>
          <div>{el.checkNumber}</div>

          <div>${el.amountOffering.toFixed(2)}</div>
          <div>${el.amountCartridge.toFixed(2)}</div>
          <div>${el.amountThanksgiving.toFixed(2)}</div>
          <div>${el.amountSelfDenial.toFixed(2)}</div>
          <div>${el.amountBuildingFund.toFixed(2)}</div>
          <div>${el.total.toFixed(2)}</div>

          <div
            className="order__chart__delete"
            onClick={() => onClickDelete(el)}
          >
            X
          </div>
        </React.Fragment>
      );
    });

  return (
    <>
      <label>{currentDate}</label>

      <div className="order__chart">
        <div>
          <label></label>
        </div>
        <div>
          <label>name</label>
        </div>
        <div>
          <label>check #</label>
        </div>
        <div>
          <label>offering</label>
        </div>
        <div>
          <label>cartridge</label>
        </div>
        <div>
          <label>thanksgiving</label>
        </div>
        <div>
          <label>self denial</label>
        </div>
        <div>
          <label>building fund</label>
        </div>

        <div>
          <label>total</label>
        </div>
        <div></div>
        {renderOrderRow}

        <div></div>
        <div style={{ borderRight: "none" }}></div>
        <div style={{ justifyContent: "end" }}>subtotal check:</div>
        <div>${totals.offeringCheckSub.toFixed(2)}</div>
        <div>${totals.cartridgeCheckSub.toFixed(2)}</div>
        <div>${totals.thanksGivingCheckSub.toFixed(2)}</div>
        <div>${totals.selfDenialCheckSub.toFixed(2)}</div>
        <div>${totals.buildingCheckSub.toFixed(2)}</div>
        <div>${totals.subTotalCheck.toFixed(2)}</div>
        <div></div>

        <div></div>
        <div style={{ borderRight: "none" }}></div>
        <div style={{ justifyContent: "end" }}>subtotal cash:</div>
        <div>${totals.offeringCashSub.toFixed(2)}</div>
        <div>${totals.cartridgeCashSub.toFixed(2)}</div>
        <div>${totals.thanksGivingCashSub.toFixed(2)}</div>
        <div>${totals.selfDenialCashSub.toFixed(2)}</div>
        <div>${totals.buildingCashSub.toFixed(2)}</div>
        <div>${totals.subTotalCash.toFixed(2)}</div>
        <div></div>

        <div></div>
        <div style={{ borderRight: "none" }}></div>
        <div style={{ justifyContent: "end" }}>total:</div>
        <div>${totals.offeringTotal.toFixed(2)}</div>
        <div>${totals.cartridgeTotal.toFixed(2)}</div>
        <div>${totals.thanksGivingTotal.toFixed(2)}</div>
        <div>${totals.selfDenialTotal.toFixed(2)}</div>
        <div>${totals.buildingTotal.toFixed(2)}</div>
        <div>${totals.total.toFixed(2)}</div>
        <div></div>
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
