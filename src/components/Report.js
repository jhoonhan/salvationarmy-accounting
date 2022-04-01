import React, { useEffect, useState } from "react";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import renderField from "./renderField";
import { createReport, putReport } from "../actions";
import FixedField from "./FixedField";

const Report = ({
  totals,
  currentDate,
  orders,
  currentReport,
  prevReport,
  meetingValues,
  groupValues,
  handleSubmit,
  createReport,
  putReport,
  showForm,
  setShowForm,
}) => {
  const [meetingTotal, setMeetingTotal] = useState(0);
  const [groupTotal, setGroupTotal] = useState(0);
  const [conditionalClass, setConditionalClass] =
    useState("addform__inputarea");

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
          convertedValues.midweekMeeting +
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
    if (!currentReport) createReport(combinedData);
    if (currentReport) putReport(currentReport._id, combinedData);
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

  useEffect(() => {
    setConditionalClass(`addform__inputarea ${!showForm ? "disabled" : ""}`);
  }, [showForm]);

  // const meetingTotal =

  const render = () => {
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
                  className={conditionalClass}
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
                  className={conditionalClass}
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
                  className={conditionalClass}
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
                  className={conditionalClass}
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
                  className={conditionalClass}
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
                <div className="addform__inputarea disabled">
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
                  className={conditionalClass}
                  isDisabled={!showForm}
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
                  className={conditionalClass}
                  isDisabled={!showForm}
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
                  className={conditionalClass}
                  isDisabled={!showForm}
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
                  className={conditionalClass}
                  isDisabled={!showForm}
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
                  className={conditionalClass}
                  isDisabled={!showForm}
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
                  className={conditionalClass}
                  isDisabled={!showForm}
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
                <div className="addform__inputarea disabled">
                  {groupTotal.toFixed(2)}
                </div>
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
                <div className="addform__inputarea disabled">
                  {(
                    +totals.offering.total + +totals.thanksGiving.total
                  ).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="addform__row">
              <div>(4004) Cartridges</div>
              <div className="addform__input">
                <div className="addform__inputarea disabled">
                  {totals.cartridge.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="addform__row">
              <div>(4601) Corps Groups</div>
              <div className="addform__input">
                <div className="addform__inputarea disabled">
                  {totals.cartridge.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="addform__row">
              <div>(6901) Self Denial</div>
              <div className="addform__input">
                <div className="addform__inputarea disabled">
                  {totals.selfDenial.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="addform__row">
              <div>World Services</div>
              <div className="addform__input">
                <div className="addform__inputarea disabled">
                  {totals.selfDenial.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="addform__row">
              <div>Building Fund</div>
              <div className="addform__input">
                <div className="addform__inputarea disabled">
                  {totals.buildingFund.total.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="addform__row">
              <div>Grand Total</div>
              <div className="addform__input">
                <div className="addform__inputarea disabled">
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
                <div className="addform__cartridge-report--number disabled">
                  {+totals.offering.total + +totals.thanksGiving.total}
                </div>
                <div className="addform__cartridge-report--number disabled">
                  {prevReport?.offering.total}
                </div>
                <div className="addform__cartridge-report--number disabled"></div>

                <div>Cartrdiges</div>
                <div className="addform__cartridge-report--number disabled">
                  {totals.cartridge.total}
                </div>
                <div className="addform__cartridge-report--number disabled">
                  {prevReport?.cartridge.total}
                </div>
                <div className="addform__cartridge-report--number disabled"></div>

                <div>World Serv.</div>
                <div className="addform__cartridge-report--number disabled">
                  {totals.selfDenial.total}
                </div>
                <div className="addform__cartridge-report--number disabled">
                  {prevReport?.selfDenial.total}
                </div>
                <div className="addform__cartridge-report--number disabled"></div>

                <div>Building Fund</div>
                <div className="addform__cartridge-report--number disabled">
                  {totals.buildingFund.total}
                </div>
                <div className="addform__cartridge-report--number disabled">
                  {prevReport?.buildingFund.total}
                </div>
                <div className="addform__cartridge-report--number disabled"></div>

                <div>Total</div>
                <div className="addform__cartridge-report--number disabled">
                  {totals.total}
                </div>
                <div className="addform__cartridge-report--number disabled">
                  {prevReport?.total}
                </div>
                <div className="addform__cartridge-report--number disabled"></div>
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
              <div className={conditionalClass} />
              <div>Counter</div>
            </div>
          </div>
          <div className="addform__column">
            <div className="addform__row-combined">
              <div className={conditionalClass} />
              <div>Counter</div>
            </div>
          </div>
        </div>
        <button type="submit" style={!showForm ? { display: "none" } : {}}>
          {currentReport ? "update" : "submit"}
        </button>
      </form>
    );
  };
  return render();
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
  const { currentReport } = ownProps;
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
  putReport,
})(wrappedForm);
