import React, { useState } from "react";
import cvtArr from "../helpers/cvtArr";
import { capitalizeName, lastFirstInitial } from "../helpers/nameHelper";

const Activity = ({ orders, users }) => {
  const initActs = () => {
    let userObj = {};
    users.forEach((user) => {
      userObj = { ...userObj, [user._id]: { name: user.name, orders: [] } };
    });

    orders.forEach((order) => {
      userObj[order.userId].orders.push(order);
    });

    const result = cvtArr(userObj)
      .filter((el) => el.data.orders.length > 0)
      .map((el) => {
        return {
          id: el.id,
          name: el.data.name,
          total: el.data.orders.reduce((a, b) => a + b.total, 0),
          totalThanksgiving: el.data.orders.reduce(
            (a, b) => a + b.amountThanksgiving,
            0
          ),
          totalCartridge: el.data.orders.reduce(
            (a, b) => a + b.amountCartridge,
            0
          ),
          totalOffering: el.data.orders.reduce(
            (a, b) => a + b.amountOffering,
            0
          ),
          totalSelfDenial: el.data.orders.reduce(
            (a, b) => a + b.amountSelfDenial,
            0
          ),
          totalBuildingFund: el.data.orders.reduce(
            (a, b) => a + b.amountBuildingFund,
            0
          ),
        };
      })
      .sort((a, b) => b.total - a.total);

    return result.slice(0, 8);
  };

  const [acts, setActs] = useState(initActs());

  const renderTable = () => {
    const renderRows = acts.map((act) => {
      return (
        <React.Fragment key={act.id}>
          <span>{capitalizeName(lastFirstInitial(act.name))}</span>
          <span>${act.totalCartridge}</span>
          <span>${act.totalOffering}</span>
          <span>${act.totalThanksgiving}</span>
          <span>${act.totalSelfDenial + act.totalBuildingFund}</span>
          <span>${act.total}</span>
        </React.Fragment>
      );
    });
    return (
      <div className="table home__user-activity">
        <span></span>
        <span>Cart</span>
        <span>Offer.</span>
        <span>Thnks.</span>
        <span>Special</span>
        <span>Total</span>

        {renderRows}
      </div>
    );
  };

  const render = () => {
    console.log(acts);
    return (
      <article className="ui__container">
        <header>
          <h3>Highest Activity</h3>
        </header>
        {renderTable()}
      </article>
    );
  };
  return render();
};

export default Activity;
//
