import React from "react";
import { connect } from "react-redux";
import { deleteOrder } from "../actions";

const OrderChart = ({ orders, deleteOrder, currentDate, totals }) => {
  const onClickDelete = (selectedOrder) => {
    const filteredOrders = orders.filter((el) => el._id !== selectedOrder._id);
    deleteOrder(selectedOrder._id, filteredOrders);
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

  const render = () => {
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
          <div>${totals.offering.check.toFixed(2)}</div>
          <div>${totals.cartridge.check.toFixed(2)}</div>
          <div>${totals.thanksGiving.check.toFixed(2)}</div>
          <div>${totals.selfDenial.check.toFixed(2)}</div>
          <div>${totals.buildingFund.check.toFixed(2)}</div>
          <div>${totals.subTotalCheck.toFixed(2)}</div>
          <div></div>

          <div></div>
          <div style={{ borderRight: "none" }}></div>
          <div style={{ justifyContent: "end" }}>subtotal cash:</div>
          <div>${totals.offering.cash.toFixed(2)}</div>
          <div>${totals.cartridge.cash.toFixed(2)}</div>
          <div>${totals.thanksGiving.cash.toFixed(2)}</div>
          <div>${totals.selfDenial.cash.toFixed(2)}</div>
          <div>${totals.buildingFund.cash.toFixed(2)}</div>
          <div>${totals.subTotalCash.toFixed(2)}</div>
          <div></div>

          <div></div>
          <div style={{ borderRight: "none" }}></div>
          <div style={{ justifyContent: "end" }}>total:</div>
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
