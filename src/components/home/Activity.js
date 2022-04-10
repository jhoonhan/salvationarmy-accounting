import React from "react";

const Activity = ({ orders, users }) => {
  console.log(orders);
  const calculateTotals = () => {
    let results = {};
    orders.forEach((order, i) => {
      if (!results[order.userId]) {
        results = {
          ...results,
          [order.userId]: {
            ...results[order.userId],
            [order._id]: {
              amountThanksgiving: order.amountThanksgiving,
              amountCartridge: order.amountCartridge,
              amountOffering: order.amountOffering,
              amountSelfDenial: order.amountSelfDenial,
              amountBuildingFund: order.amountBuildingFund,
              total: order.total,
            },
          },
        };
      }
      if (results[order.userId]) {
        console.log(`exists for ${order.nameK}`);
      }

      results = {
        ...results,
        [order.userId]: {
          ...results[order.userId],
          [order._id]: {
            amountThanksgiving: order.amountThanksgiving,
            amountCartridge: order.amountCartridge,
            amountOffering: order.amountOffering,
            amountSelfDenial: order.amountSelfDenial,
            amountBuildingFund: order.amountBuildingFund,
            total: order.total,
          },
        },
      };
    });
    // console.log(results);
  };

  const render = () => {
    calculateTotals();
    return (
      <article className="ui__container">
        <header>
          <h3>Highest Activity</h3>
        </header>
        <div className="table home__user-activity">
          <span></span>
          <span>Cart</span>
          <span>Offer.</span>
          <span>Thnks.</span>
          <span>S&W</span>
          <span>Build.</span>
          <span>Total</span>

          <span>Kang, M</span>
          <span>$3000.00</span>
          <span>$200.00</span>
          <span>$100.00</span>
          <span>$0.00</span>
          <span>$200.00</span>
          <span>$5000.00</span>

          <span>Han, H</span>
          <span>$3000.00</span>
          <span>$200.00</span>
          <span>$100.00</span>
          <span>$0.00</span>
          <span>$200.00</span>
          <span>$5000.00</span>

          <span>Kim, K</span>
          <span>$3000.00</span>
          <span>$200.00</span>
          <span>$100.00</span>
          <span>$0.00</span>
          <span>$200.00</span>
          <span>$5000.00</span>

          <span>Kim, O</span>
          <span>$3000.00</span>
          <span>$200.00</span>
          <span>$100.00</span>
          <span>$0.00</span>
          <span>$200.00</span>
          <span>$5000.00</span>

          <span>Lee, M</span>
          <span>$3000.00</span>
          <span>$200.00</span>
          <span>$100.00</span>
          <span>$0.00</span>
          <span>$200.00</span>
          <span>$5000.00</span>

          <span>Kang, M</span>
          <span>$3000.00</span>
          <span>$200.00</span>
          <span>$100.00</span>
          <span>$0.00</span>
          <span>$200.00</span>
          <span>$5000.00</span>

          <span>Jeong, G</span>
          <span>$3000.00</span>
          <span>$200.00</span>
          <span>$100.00</span>
          <span>$0.00</span>
          <span>$200.00</span>
          <span>$5000.00</span>

          <span>Roh, B</span>
          <span>$3000.00</span>
          <span>$200.00</span>
          <span>$100.00</span>
          <span>$0.00</span>
          <span>$200.00</span>
          <span>$5000.00</span>
        </div>
      </article>
    );
  };
  return render();
};

export default Activity;
//
