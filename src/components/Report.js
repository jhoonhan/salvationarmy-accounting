import React, { useEffect, useState } from "react";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import renderField from "./renderField";
import { createReport } from "../actions";
import FixedField from "./FixedField";

const Report = ({
  totals,
  currentDate,
  orders,
  prevReport,
  meetingValues,
  groupValues,
  handleSubmit,
  createReport,
}) => {
  const [meetingTotal, setMeetingTotal] = useState(0);
  const [groupTotal, setGroupTotal] = useState(0);

  useEffect(() => {
    console.log(prevReport);
  }, [prevReport]);

  const reportSubmit = (formValues) => {
    const orderIds = orders.map((order) => order._id);
    const convertedValues = { ...formValues };
    Object.keys(convertedValues).forEach(
      (el) => (convertedValues[el] = parseInt(convertedValues[el]))
    );
    const combinedData = {
      ...convertedValues,
      ...totals,
      meeting: {
        sundaySchool: convertedValues.sundaySchool,
        holinessMeeting: convertedValues.holinessMeeting,
        salvationMeeting: convertedValues.salvationMeeting,
        midweekMeeting: convertedValues.midweekMeeting,
        otherMeeting: convertedValues.otherMeeting,
        total:
          convertedValues.sundaySchool +
          convertedValues.holinessMeeting +
          convertedValues.salvationMeeting +
          convertedValues.otherMeeting,
      },
      groups: {
        adventureCorps: convertedValues.adventureCorps,
        jrLegion: convertedValues.jrLegion,
        sunbeams: convertedValues.sunbeams,
        girlGuards: convertedValues.girlGuards,
        ypl: convertedValues.ypl,
        otherGroup: convertedValues.otherGroup,
        total:
          convertedValues.adventureCorps +
          convertedValues.jrLegion +
          convertedValues.sunbeams +
          convertedValues.girlGuards +
          convertedValues.ypl +
          convertedValues.otherGroup,
      },
      date: currentDate,
      orders: orderIds,
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
              <FixedField
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
              <FixedField
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
              <FixedField
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
              <FixedField
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
              <FixedField
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
              <FixedField
                name="adventureCorps"
                component={renderField}
                type="number"
                className="addform__inputarea"
              />
            </div>
          </div>
          <div className="addform__row">
            <div>Jr. Legion</div>
            <div className="addform__input">
              <FixedField
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
              <FixedField
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
              <FixedField
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
              <FixedField
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
              <FixedField
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
            <div>(4003) Offering + Thanksgiving</div>
            <div className="addform__input">
              <div className="addform__inputarea">
                {(+totals.offering.total + +totals.thanksGiving.total).toFixed(
                  2
                )}
              </div>
            </div>
          </div>

          <div className="addform__row">
            <div>(4004) Cartridges</div>
            <div className="addform__input">
              <div className="addform__inputarea">
                {totals.cartridge.total.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="addform__row">
            <div>(4601) Corps Groups</div>
            <div className="addform__input">
              <div className="addform__inputarea">
                {totals.cartridge.total.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="addform__row">
            <div>(6901) Self Denial</div>
            <div className="addform__input">
              <div className="addform__inputarea">
                {totals.selfDenial.total.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="addform__row">
            <div>World Services</div>
            <div className="addform__input">
              <div className="addform__inputarea">
                {totals.selfDenial.total.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="addform__row">
            <div>Building Fund</div>
            <div className="addform__input">
              <div className="addform__inputarea">
                {totals.buildingFund.total.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="addform__row">
            <div>Grand Total</div>
            <div className="addform__input">
              <div className="addform__inputarea">
                {totals.total.toFixed(2)}
              </div>
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
              <div className="addform__cartridge-report--number">
                {+totals.offering.total + +totals.thanksGiving.total}
              </div>
              <div className="addform__cartridge-report--number">aang</div>
              <div className="addform__cartridge-report--number"></div>

              <div>Cartrdiges</div>
              <div className="addform__cartridge-report--number">
                {totals.cartridge.total}
              </div>
              <div className="addform__cartridge-report--number"></div>
              <div className="addform__cartridge-report--number"></div>

              <div>World Serv.</div>
              <div className="addform__cartridge-report--number">
                {totals.selfDenial.total}
              </div>
              <div className="addform__cartridge-report--number"></div>
              <div className="addform__cartridge-report--number"></div>

              <div>Building Fund</div>
              <div className="addform__cartridge-report--number">
                {totals.buildingFund.total}
              </div>
              <div className="addform__cartridge-report--number"></div>
              <div className="addform__cartridge-report--number"></div>

              <div>Total</div>
              <div className="addform__cartridge-report--number">
                {totals.total}
              </div>
              <div className="addform__cartridge-report--number"></div>
              <div className="addform__cartridge-report--number"></div>
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
  const [currentReport] = ownProps.currentReport;
  return {
    initialValues: {
      sundaySchool: currentReport?.meeting.sundaySchool,
      holinessMeeting: currentReport?.meeting.holinessMeeting,
      salvationMeeting: currentReport?.meeting.salvationMeeting,
      midweekMeeting: currentReport?.meeting.midweekMeeting,
      otherMeeting: currentReport?.meeting.otherMeeting,
      adventureCorps: currentReport?.groups.adventureCorps,
      jrLegion: currentReport?.groups.jrLegion,
      sunbeams: currentReport?.groups.sunbeams,
      girlGuards: currentReport?.groups.girlGuards,
      ypl: currentReport?.groups.ypl,
      otherGroup: currentReport?.groups.otherGroup,
    },
    meetingValues: {
      sundaySchool: +selector(state, "sundaySchool"),
      holinessMeeting: +selector(state, "holinessMeeting"),
      salvationMeeting: +selector(state, "salvationMeeting"),
      midweekMeeting: +selector(state, "midweekMeeting"),
      otherMeeting: +selector(state, "otherMeeting"),
    },
    groupValues: {
      adventureCorps: +selector(state, "adventureCorps"),
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
