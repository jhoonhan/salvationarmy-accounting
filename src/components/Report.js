import React, { useEffect, useState } from "react";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import renderField from "./renderField";
import { createReport } from "../actions";

const Report = ({
  totals,
  meetingValues,
  groupValues,
  handleSubmit,
  createReport,
}) => {
  const [meetingTotal, setMeetingTotal] = useState(0);
  const [groupTotal, setGroupTotal] = useState(0);

  const reportSubmit = (formValues) => {
    const testValues = { ...formValues };
    Object.keys(testValues).forEach(
      (el) => (testValues[el] = parseInt(testValues[el]))
    );

    const combinedData = {
      ...testValues,
      ...totals,
    };
    createReport(combinedData);
  };
  useEffect(() => {
    const meetingTotal = Object.values(meetingValues).reduce((prev, curr) => {
      return prev + (curr ? curr : 0);
    }, 0);

    const groupTotal = Object.values(groupValues).reduce((prev, curr) => {
      return prev + (curr ? curr : 0);
    }, 0);
    setMeetingTotal(meetingTotal);
    setGroupTotal(groupTotal);
  }, [meetingValues, groupValues]);

  // const meetingTotal =

  return (
    <form onSubmit={handleSubmit(reportSubmit)}>
      <div className="addform__container">
        <div className="addform__column">
          <div className="addform__row" style={{ marginBottom: "1rem" }}>
            <label>(4003) Meeting Collections</label>
            <div></div>
          </div>
          <div className="addform__row">
            <div>Sunday School</div>
            <div className="addform__input">
              <Field
                name="sundaySchool"
                component={renderField}
                type="number"
                className="addform__inputarea"
              />
            </div>
          </div>
          <div className="addform__row">
            <div>Holiness Meeting</div>
            <div className="addform__input">
              <Field
                name="holinessMeeting"
                component={renderField}
                type="number"
                className="addform__inputarea"
              />
            </div>
          </div>
          <div className="addform__row">
            <div>Salvation Meeting</div>
            <div className="addform__input">
              <Field
                name="salvationMeeting"
                component={renderField}
                type="number"
                className="addform__inputarea"
              />
            </div>
          </div>
          <div className="addform__row">
            <div>Mid-Week Meeting</div>
            <div className="addform__input">
              <Field
                name="midweekMeeting"
                component={renderField}
                type="number"
                className="addform__inputarea"
              />
            </div>
          </div>
          <div className="addform__row">
            <div>Other</div>
            <div className="addform__input">
              <Field
                name="otherMeeting"
                component={renderField}
                type="number"
                className="addform__inputarea"
              />
            </div>
          </div>
          <div className="addform__row">
            <div></div>
            <div></div>
          </div>
          <div className="addform__row">
            <div>Total</div>
            <div className="addform__input">
              <div className="addform__inputarea">
                {meetingTotal.toFixed(2)}
              </div>
            </div>
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
            <div className="addform__input">
              <Field
                name="adventrueCorps"
                component={renderField}
                type="number"
                className="addform__inputarea"
              />
            </div>
          </div>
          <div className="addform__row">
            <div>Jr. Legion</div>
            <div className="addform__input">
              <Field
                name="jrLegion"
                component={renderField}
                type="number"
                className="addform__inputarea"
              />
            </div>
          </div>
          <div className="addform__row">
            <div>Sunbeams</div>
            <div className="addform__input">
              <Field
                name="sunbeams"
                component={renderField}
                type="number"
                className="addform__inputarea"
              />
            </div>
          </div>
          <div className="addform__row">
            <div>Girl Guards</div>
            <div className="addform__input">
              <Field
                name="girlGuards"
                component={renderField}
                type="number"
                className="addform__inputarea"
              />
            </div>
          </div>
          <div className="addform__row">
            <label>Y.P.L.</label>
            <div className="addform__input">
              <Field
                name="ypl"
                component={renderField}
                type="number"
                className="addform__inputarea"
              />
            </div>
          </div>
          <div className="addform__row">
            <label>Other</label>
            <div className="addform__input">
              <Field
                name="otherGroup"
                component={renderField}
                type="number"
                className="addform__inputarea"
              />
            </div>
          </div>
          <div className="addform__row">
            <div></div>
            <div></div>
          </div>
          <div className="addform__row">
            <label>Total Corps Groups</label>
            <div className="addform__input">
              <div className="addform__inputarea">{groupTotal.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="addform__column">
          <div className="addform__row" style={{ marginBottom: "1rem" }}>
            <label>Recapitulation</label>
            <div></div>
          </div>

          <div className="addform__row">
            <div>(4003) Offering (Offering + Thanksgiving)</div>
            <div className="addform__input">
              <div className="addform__inputarea">
                {(+totals.offeringTotal + +totals.thanksGivingTotal).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="addform__row">
            <div>(4004) Cartridges</div>
            <div className="addform__input">
              <div className="addform__inputarea">{totals.cartridgeTotal}</div>
            </div>
          </div>

          <div className="addform__row">
            <div>(4601) Corps Groups</div>
            <div className="addform__input">
              <div className="addform__inputarea">{totals.cartridgeTotal}</div>
            </div>
          </div>

          <div className="addform__row">
            <div>(6901) Self Denial</div>
            <div className="addform__input">
              <div className="addform__inputarea">{totals.selfDenialTotal}</div>
            </div>
          </div>

          <div className="addform__row">
            <div>World Services</div>
            <div className="addform__input">
              <div className="addform__inputarea">{totals.selfDenialTotal}</div>
            </div>
          </div>

          <div className="addform__row">
            <div>Building Fund</div>
            <div className="addform__input">
              <div className="addform__inputarea">{totals.buildingTotal}</div>
            </div>
          </div>

          <div className="addform__row">
            <div>Grand Total</div>
            <div className="addform__input">
              <div className="addform__inputarea">{totals.total}</div>
            </div>
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
              <div>{+totals.offeringTotal + +totals.thanksGivingTotal}</div>
              <div></div>
              <div>
                <input />
              </div>

              <div>Cartrdiges</div>
              <div>{totals.cartridgeTotal}</div>

              <div>
                <input />
              </div>
              <div>
                <input />
              </div>

              <div>World Serv.</div>
              <div>{totals.selfDenialTotal}</div>

              <div>
                <input />
              </div>
              <div>
                <input />
              </div>

              <div>Building Fund</div>
              <div>{totals.buildingTotal}</div>

              <div>
                <input />
              </div>
              <div>
                <input />
              </div>

              <div>Total</div>
              <div>{totals.total}</div>

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
            <div className="addform__inputarea" />
            <div>Counter</div>
          </div>
        </div>
        <div className="addform__column">
          <div className="addform__row-combined">
            <div className="addform__inputarea" />
            <div>Counter</div>
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const wrappedForm = reduxForm({
  form: "reportsForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(Report);

const selector = formValueSelector("reportsForm");

const mapStateToProps = (state, ownProps) => {
  return {
    meetingValues: {
      sundaySchool: +selector(state, "sundaySchool"),
      holinessMeeting: +selector(state, "holinessMeeting"),
      salvationMeeting: +selector(state, "salvationMeeting"),
      midweekMeeting: +selector(state, "midweekMeeting"),
      otherMeeting: +selector(state, "otherMeeting"),
    },
    groupValues: {
      adventrueCorps: +selector(state, "adventrueCorps"),
      jrLegion: +selector(state, "jrLegion"),
      sunbeams: +selector(state, "sunbeams"),
      girlGuards: +selector(state, "girlGuards"),
      ypl: +selector(state, "ypl"),
      otherGroup: +selector(state, "otherGroup"),
    },
  };
};

export default connect(mapStateToProps, {
  change,
  createReport,
})(wrappedForm);
