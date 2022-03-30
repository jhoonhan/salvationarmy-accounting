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

          <div>${el.amountOffering}</div>
          <div>${el.amountCartridge}</div>
          <div>${el.amountThanksgiving}</div>
          <div>${el.amountSelfDenial}</div>
          <div>${el.amountBuildingFund}</div>
          <div>${el.total}</div>

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
        <div>${totals.offeringCheckSub}</div>
        <div>${totals.cartridgeCheckSub}</div>
        <div>${totals.thanksGivingCheckSub}</div>
        <div>${totals.selfDenialCheckSub}</div>
        <div>${totals.buildingCheckSub}</div>
        <div>${totals.subTotalCheck}</div>
        <div></div>

        <div></div>
        <div style={{ borderRight: "none" }}></div>
        <div style={{ justifyContent: "end" }}>subtotal cash:</div>
        <div>${totals.offeringCashSub}</div>
        <div>${totals.cartridgeCashSub}</div>
        <div>${totals.thanksGivingCashSub}</div>
        <div>${totals.selfDenialCashSub}</div>
        <div>${totals.buildingCashSub}</div>
        <div>${totals.subTotalCash}</div>
        <div></div>

        <div></div>
        <div style={{ borderRight: "none" }}></div>
        <div style={{ justifyContent: "end" }}>total:</div>
        <div>${totals.offeringTotal}</div>
        <div>${totals.cartridgeTotal}</div>
        <div>${totals.thanksGivingTotal}</div>
        <div>${totals.selfDenialTotal}</div>
        <div>${totals.buildingTotal}</div>
        <div>${totals.total}</div>
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
