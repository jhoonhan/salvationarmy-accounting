import React from "react";

const AdditionalForm = () => {
  return (
    <>
      <div className="addform__container">
        <div className="addform__column">
          <div className="addform__row" style={{ marginBottom: "1rem" }}>
            <label>(4003) Meeting Collections</label>
            <div></div>
          </div>
          <div className="addform__row">
            <div>Sunday School</div>
            <input className="addform__input" />
          </div>
          <div className="addform__row">
            <div>Holiness Meeting</div>
            <input className="addform__input" />
          </div>
          <div className="addform__row">
            <div>Salvation Meeting</div>
            <input className="addform__input" />
          </div>
          <div className="addform__row">
            <div>Mid-Week Meeting</div>
            <input className="addform__input" />
          </div>
          <div className="addform__row">
            <div>Other</div>
            <input className="addform__input" />
          </div>
          <div className="addform__row">
            <div></div>
            <div></div>
          </div>
          <div className="addform__row">
            <div>Total</div>
            <input className="addform__input" />
          </div>

          <div
            className="addform__row"
            style={{ marginTop: "2rem", marginBottom: "1rem" }}
          >
            <label>(4601) Corps Groups</label>
            <div></div>
          </div>
          <div className="addform__row">
            <div>Adventure Corps</div>
            <input className="addform__input" />
          </div>
          <div className="addform__row">
            <div>Jr. Legion</div>
            <input className="addform__input" />
          </div>
          <div className="addform__row">
            <div>Sunbeams</div>
            <input className="addform__input" />
          </div>
          <div className="addform__row">
            <div>Girl Guards</div>
            <input className="addform__input" />
          </div>
          <div className="addform__row">
            <div>Y.P.L.</div>
            <input className="addform__input" />
          </div>
          <div className="addform__row">
            <div>Other</div>
            <input className="addform__input" />
          </div>
          <div className="addform__row">
            <div></div>
            <div></div>
          </div>
          <div className="addform__row">
            <div>Total Corps Groups</div>
            <input className="addform__input" />
          </div>
        </div>

        <div className="addform__column">
          <div className="addform__row" style={{ marginBottom: "1rem" }}>
            <label>Recapitulation</label>
            <div></div>
          </div>

          <div className="addform__row">
            <div>(4003) Offering (Offering + Thanksgiving)</div>
            <input className="addform__input" />
          </div>

          <div className="addform__row">
            <div>(4004) Cartridges</div>
            <input className="addform__input" />
          </div>

          <div className="addform__row">
            <div>(4601) Corps Groups</div>
            <input className="addform__input" />
          </div>

          <div className="addform__row">
            <div>(6901) Self Denial</div>
            <input className="addform__input" />
          </div>

          <div className="addform__row">
            <div>World Services</div>
            <input className="addform__input" />
          </div>

          <div className="addform__row">
            <div>Building Fund</div>
            <input className="addform__input" />
          </div>

          <div className="addform__row">
            <div>Grand Total</div>
            <input className="addform__input" />
          </div>

          <div
            className="addform__row-combined"
            style={{ marginTop: "2rem", marginBottom: "1rem" }}
          >
            <label>Cartrdige Report</label>
          </div>

          <div className="addform__row-combined">
            <div className="addform__cartridge-report">
              <div></div>
              <div>This Week</div>
              <div>Previous Week</div>
              <div>Total to Date</div>

              <div>Offerings</div>
              <div>
                <input />
              </div>
              <div>
                <input />
              </div>
              <div>
                <input />
              </div>

              <div>Cartrdiges</div>
              <div>
                <input />
              </div>
              <div>
                <input />
              </div>
              <div>
                <input />
              </div>

              <div>World Serv.</div>
              <div>
                <input />
              </div>
              <div>
                <input />
              </div>
              <div>
                <input />
              </div>

              <div>Building Fund</div>
              <div>
                <input />
              </div>
              <div>
                <input />
              </div>
              <div>
                <input />
              </div>

              <div>Total</div>
              <div>
                <input />
              </div>
              <div>
                <input />
              </div>
              <div>
                <input />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="addform__container"
        style={{ marginTop: "6rem", marginBottom: "4rem" }}
      >
        <div className="addform__column">
          <div className="addform__row-combined">
            <div className="addform__input" />
            <div>Counter</div>
          </div>
        </div>
        <div className="addform__column">
          <div className="addform__row-combined">
            <div className="addform__input" />
            <div>Counter</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalForm;
