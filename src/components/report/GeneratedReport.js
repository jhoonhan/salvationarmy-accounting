import React, { useState, useEffect } from "react";

import useGetTotal from "../hooks/useGetTotal";
import useFilterOrders from "../hooks/useFilterOrders";
import sortOrderByKey from "../helpers/sortOrderByKey";
import getTotal from "../helpers/getTotal";
import { capitalizeName } from "../helpers/nameHelper";
import letterLogo from "../../assets/images/logo_letter.png";

const GeneratedReport = ({ orders, users, selectedUser, selectedYear }) => {
  const filteredOrders = useFilterOrders({
    orders,
    selectedUser,
    selectedYear,
  });
  // const totals = useGetTotal(filteredOrders);
  const [showReport, setShowReport] = useState(true);

  const sortedOrders = sortOrderByKey(filteredOrders, "userId");
  const userList = Object.keys(sortedOrders);

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

  const renderTable = (orders, totals) => {
    return (
      <div
        className="flex__vertical"
        style={{
          minHeight: "500px",
          backgroundColor: "white",
        }}
      >
        <div>
          <label>Generated Report</label>
          <p style={{ paddingTop: "20px" }}>Year: {selectedYear}</p>
          <p>Name: {capitalizeName(orders[0].name)}</p>
        </div>
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
          {showReport && renderOrderRow(orders)}

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
    );
  };
  const renderLetter = (name, totals) => {
    return (
      <div className="letter-container">
        <img src={letterLogo} width="180" alt="logo" />
        <p>
          Dear {name},
          <br />
          <br />
          <br />
          We thank God for you! Your gifts of ${totals.total.toFixed(2)} to The
          Salvation Army of Kernersville, NC during the year of{" "}
          {new Date().getFullYear()} are gratefully acknowledged. Because of
          your contributions, our congregation has been able to support the work
          of Jesus Christ locally and around the world.
          <br />
          <br />
          For income tax purposes, it is important for us to state here that you
          did not receive any goods or services in return for any of these
          contributions other than intangible religious benefits. You made
          theses gifts out of you own generosity and commitment to Jesus Christ.
          <br />
          <br />
          Once again, thank you for your generous commitment to the work of
          Jesus Christ through The Salvation Army of Forsyth County.
          <br />
        </p>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Tithes (Cartridge)</th>
              <th>Sunday Offering</th>
              <th>Thanks Offering</th>
              <th>Building Offering</th>
              <th>Missionary Offering</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Amount</td>
              <td>$ {showReport ? totals.cartridge.total.toFixed(2) : 0}</td>
              <td>$ {showReport ? totals.offering.total.toFixed(2) : 0}</td>
              <td>$ {showReport ? totals.thanksGiving.total.toFixed(2) : 0}</td>
              <td>$ {showReport ? totals.selfDenial.total.toFixed(2) : 0}</td>
              <td>$ {showReport ? totals.buildingFund.total.toFixed(2) : 0}</td>
              <td>$ {showReport ? totals.total.toFixed(2) : 0}</td>
            </tr>
          </tbody>
        </table>
        <p>
          Sincerely,
          <br />
          <br />
          <br />
          Minkee Kim, Captain
          <br />
          The Salvation Army of Kernersville, NC
          <br />
          132 E. Mountain St. Kernersville, NC 27284
          <br />
        </p>
      </div>
    );
  };

  const renderTableByUser = (userIds, orders) => {
    if (!userIds || !orders) return;
    return userIds.map((id) => {
      const userOrders = orders[id];
      const totals = getTotal(userOrders);
      const name = capitalizeName(userOrders[0].name);
      return (
        <React.Fragment key={id}>
          {/* <div
            className="flex__vertical"
            style={{
              minHeight: "500px",
              backgroundColor: "white",
            }}
          >
            <div>
              <label>Generated Report</label>
              <p style={{ paddingTop: "20px" }}>Year: {selectedYear}</p>
              <p>Name: {capitalizeName(orders[id][0].name)}</p>
            </div>
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
          </div> */}
          {renderTable(orders[id], totals)}
          <div className="page-break"></div>
          {renderLetter(name, totals)}
          <div className="page-break"></div>
        </React.Fragment>
      );
    });
  };

  const render = () => {
    // return <>{renderTable()}</>;
    return <>{renderTableByUser(userList, sortedOrders)}</>;
  };

  return render();
};

export default GeneratedReport;
