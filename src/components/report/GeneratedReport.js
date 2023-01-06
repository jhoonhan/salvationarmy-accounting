import React, { useState, useEffect } from "react";

import useFilterOrders from "../hooks/useFilterOrders";
import sortOrderByKey from "../helpers/sortOrderByKey";
import getTotal from "../helpers/getTotal";
import { capitalizeName } from "../helpers/nameHelper";
import letterLogo from "../../assets/images/logo_letter.png";

const GeneratedReport = ({
  orders,
  selectedUser,
  selectedYear,
  customReport,
}) => {
  const filteredOrders = useFilterOrders({
    orders,
    selectedUser,
    selectedYear,
  });
  // const totals = useGetTotal(filteredOrders);
  const [showReport, setShowReport] = useState(true);

  const sortedOrders = sortOrderByKey(filteredOrders, "userId");
  const userList = Object.keys(sortedOrders);

  const letterDataInitValue = {
    name: "",
    buildingFund: {
      cash: 0,
      check: 0,
      total: 0,
    },
    cartridge: {
      cash: 0,
      check: 0,
      total: 0,
    },
    offering: {
      cash: 0,
      check: 0,
      total: 0,
    },
    selfDenial: {
      cash: 0,
      check: 0,
      total: 0,
    },
    subTotalCash: 0,
    subTotalCheck: 0,
    thanksGiving: {
      cash: 0,
      check: 0,
      total: 0,
    },
    total: 0,
  };
  const [letterData, setLetterData] = useState(letterDataInitValue);

  useEffect(() => {
    if (!selectedUser) {
      setLetterData(letterDataInitValue);
    }
    if (selectedUser) {
      const userOrders = sortedOrders[selectedUser._id];
      const totals = getTotal(userOrders);
      setLetterData({
        ...letterData,
        name: selectedUser.name,
        total: totals.total,
      });
    }
  }, [selectedUser]);

  const convertOutput = (str) => {
    let output;
    if (str === 0 || str === "0") {
      output = "";
    } else {
      output = `$ ${str.toFixed(2)}`;
    }
    return output;
  };

  const renderEmptyRow = (orders) => {
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

  const renderTable = (orders, totals, index) => {
    return (
      <div
        className="flex__vertical"
        style={{
          backgroundColor: "white",
        }}
      >
        <div style={{ width: "100%" }}>
          <h4 style={{ width: "100%", textAlign: "center" }}>
            Generated Report
          </h4>
          <p>Year: {selectedYear}</p>
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
          {renderEmptyRow(orders)}

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

  const letterOnChange = (e, type) => {
    const obj = { ...letterData };
    obj[type] = e.target.value;
    setLetterData(obj);
  };

  const renderLetter = (name, totals) => {
    return (
      <div className="letter-container">
        <img src={letterLogo} width="180" alt="logo" />
        <p>
          Dear{" "}
          {!customReport ? (
            name
          ) : (
            <input
              onChange={(e) =>
                setLetterData({ ...letterData, name: e.target.value })
              }
              value={letterData.name}
              className="print-hide"
              type="text"
            />
          )}
          <span className="print-show">
            {letterData.name
              ? letterData.name
              : capitalizeName(selectedUser?.name)}
          </span>
          ,
          <br />
          <br />
          <br />
          We thank God for you! Your gifts of $
          {!customReport ? (
            letterData.total.toFixed(2)
          ) : (
            <>
              <input
                onChange={(e) =>
                  setLetterData({ ...letterData, total: e.target.value })
                }
                value={letterData.total}
                className="print-hide"
                type="number"
              />
              <span className="print-show">
                {letterData.total ? letterData.total : totals?.total.toFixed(2)}
              </span>
            </>
          )}{" "}
          to The Salvation Army of Kernersville, NC during the year of{" "}
          {selectedYear} are gratefully acknowledged. Because of your
          contributions, our congregation has been able to support the work of
          Jesus Christ locally and around the world.
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
              <td>
                <div className="total-value">
                  $
                  {!customReport ? (
                    totals.cartridge.total.toFixed(2)
                  ) : (
                    <>
                      <input
                        onChange={(e) => letterOnChange(e, "cartridge")}
                        className="print-hide"
                        type="text"
                      />
                      <span className="print-show">
                        {letterData.cartridge.total}
                      </span>
                    </>
                  )}
                </div>
              </td>
              <td>
                <div className="total-value">
                  $
                  {!customReport ? (
                    totals.offering.total.toFixed(2)
                  ) : (
                    <>
                      <input
                        onChange={(e) => letterOnChange(e, "offering")}
                        className="print-hide"
                        type="text"
                      />
                      <span className="print-show">
                        {letterData.offering.total}
                      </span>
                    </>
                  )}
                </div>
              </td>
              <td>
                <div className="total-value">
                  $
                  {!customReport ? (
                    totals.thanksGiving.total.toFixed(2)
                  ) : (
                    <>
                      <input
                        onChange={(e) => letterOnChange(e, "thanksGiving")}
                        className="print-hide"
                        type="text"
                      />

                      <span className="print-show">
                        {letterData.thanksGiving.total}
                      </span>
                    </>
                  )}
                </div>
              </td>
              <td>
                <div className="total-value">
                  $
                  {!customReport ? (
                    totals.selfDenial.total.toFixed(2)
                  ) : (
                    <>
                      <input
                        onChange={(e) => letterOnChange(e, "selfDenial")}
                        className="print-hide"
                        type="text"
                      />
                      <span className="print-show">
                        {letterData.selfDenial.total}
                      </span>
                    </>
                  )}
                </div>
              </td>
              <td>
                <div className="total-value">
                  $
                  {!customReport ? (
                    totals.buildingFund.total.toFixed(2)
                  ) : (
                    <>
                      <input
                        onChange={(e) => letterOnChange(e, "buildingFund")}
                        className="print-hide"
                        type="text"
                      />
                      <span className="print-show">
                        {letterData.buildingFund.total}
                      </span>
                    </>
                  )}
                </div>
              </td>
              <td>
                <div className="total-value">
                  ${!customReport ? totals.total.toFixed(2) : letterData.total}
                </div>
              </td>
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
    return userIds.map((id, i, arr) => {
      const userOrders = orders[id];
      const totals = getTotal(userOrders);
      const name = capitalizeName(userOrders[0].name);
      const index = `${i + 1}/${arr.length}`;
      return (
        <React.Fragment key={id}>
          {renderTable(orders[id], totals, index)}
          <div className="page-break"></div>
          {renderLetter(name, totals)}
          {i + 1 < arr.length && <div className="page-break"></div>}
        </React.Fragment>
      );
    });
  };

  const renderCustomReport = () => {
    if (!customReport) return null;
    const userOrders = sortedOrders[selectedUser?._id];
    const totals = getTotal(userOrders);
    return renderLetter(selectedUser?.name, totals);
  };

  const render = () => {
    console.log(letterData);
    return (
      <>
        {!customReport && renderTableByUser(userList, sortedOrders)}
        {renderCustomReport()}
      </>
    );
  };

  return render();
};

export default GeneratedReport;
