import React from "react";
import { connect } from "react-redux";
import { deleteOrder } from "../actions";

const OrderChart = ({ orders, deleteOrder, currentDate }) => {
  const onClickDelete = (selectedOrder) => {
    const filteredOrders = orders.filter((el) => el.id !== selectedOrder.id);
    deleteOrder(selectedOrder.id, filteredOrders);
  };

  const getTotalAmount = (type, amount) => {
    let sum;
    if (!type) {
      sum = orders.reduce((a, b) => {
        return a + b[amount];
      }, 0);
    }
    if (type) {
      const filtered = orders.filter((order) => order.type === type);
      sum = filtered.reduce((a, b) => {
        return a + b[amount];
      }, 0);
    }
    return sum;
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
        <div>subtotal check:</div>
        <div>${getTotalAmount("check", "amountOffering")}</div>
        <div>${getTotalAmount("check", "amountCartridge")}</div>
        <div>${getTotalAmount("check", "amountThanksgiving")}</div>
        <div>${getTotalAmount("check", "amountSelfDenial")}</div>
        <div>${getTotalAmount("check", "amountBuildingFund")}</div>
        <div>${getTotalAmount("check", "total")}</div>
        <div></div>

        <div></div>
        <div style={{ borderRight: "none" }}></div>
        <div>subtotal cash:</div>
        <div>${getTotalAmount("cash", "amountOffering")}</div>
        <div>${getTotalAmount("cash", "amountCartridge")}</div>
        <div>${getTotalAmount("cash", "amountThanksgiving")}</div>
        <div>${getTotalAmount("cash", "amountSelfDenial")}</div>
        <div>${getTotalAmount("cash", "amountBuildingFund")}</div>
        <div>${getTotalAmount("cash", "total")}</div>
        <div></div>

        <div></div>
        <div style={{ borderRight: "none" }}></div>
        <div>total:</div>
        <div>${getTotalAmount(false, "amountOffering")}</div>
        <div>${getTotalAmount(false, "amountCartridge")}</div>
        <div>${getTotalAmount(false, "amountThanksgiving")}</div>
        <div>${getTotalAmount(false, "amountSelfDenial")}</div>
        <div>${getTotalAmount(false, "amountBuildingFund")}</div>
        <div>${getTotalAmount(false, "total")}</div>
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
