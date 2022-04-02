import React, { useEffect, useState } from "react";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import renderField from "./renderField";
import { createReport, putReport } from "../actions";
import FixedField from "./FixedField";
import { capitalizeName } from "./helpers/nameHelper";

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
      counter1: formValues.counter1,
      counter2: formValues.counter2,
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
      <form onSubmit={handleSubmit(reportSubmit)} className="addform">
        <div className="addform__section">
          <div className="addform__column">
            <div className="addform__row">
              <label>(4003) Meeting Collections</label>
              <div className="addform__list">
                <div>Sunday School</div>
                <div className="addform__input">
                  <FixedField
                    name="sundaySchool"
                    component={renderField}
                    type="number"
                    className={conditionalClass}
                    isDisabled={!showForm}
                  />
                </div>
              </div>
              <div className="addform__list">
                <div>Holiness Meeting</div>
                <div className="addform__input">
                  <FixedField
                    name="holinessMeeting"
                    component={renderField}
                    type="number"
                    className={conditionalClass}
                    isDisabled={!showForm}
                  />
                </div>
              </div>
              <div className="addform__list">
                <div>Salvation Meeting</div>
                <div className="addform__input">
                  <FixedField
                    name="salvationMeeting"
                    component={renderField}
                    type="number"
                    className={conditionalClass}
                    isDisabled={!showForm}
                  />
                </div>
              </div>
              <div className="addform__list">
                <div>Mid-Week Meeting</div>
                <div className="addform__input">
                  <FixedField
                    name="midweekMeeting"
                    component={renderField}
                    type="number"
                    className={conditionalClass}
                    isDisabled={!showForm}
                  />
                </div>
              </div>
              <div className="addform__list">
                <div>Other</div>
                <div className="addform__input">
                  <FixedField
                    name="otherMeeting"
                    component={renderField}
                    type="number"
                    className={conditionalClass}
                    isDisabled={!showForm}
                  />
                </div>
              </div>
              <div className="addform__list">
                <div>Total</div>
                <div className="addform__input">
                  <div className="addform__inputarea disabled">
                    {meetingTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="addform__column">
            <div className="addform__row">
              <label>Recapitulation</label>
              <div className="addform__list">
                <div>(4003) Offering + Thanksgiving</div>
                <div className="addform__input">
                  <div className="addform__inputarea disabled">
                    {(
                      +totals.offering.total + +totals.thanksGiving.total
                    ).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="addform__list">
                <div>(4004) Cartridges</div>
                <div className="addform__input">
                  <div className="addform__inputarea disabled">
                    {totals.cartridge.total.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="addform__list">
                <div>(4601) Corps Groups</div>
                <div className="addform__input">
                  <div className="addform__inputarea disabled">
                    {currentReport?.groups.total.toFixed(2) || "0.00"}
                  </div>
                </div>
              </div>

              <div className="addform__list">
                <div>(6901) Self Denial + World Services</div>
                <div className="addform__input">
                  <div className="addform__inputarea disabled">
                    {totals.selfDenial.total.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="addform__list">
                <div>Building Fund</div>
                <div className="addform__input">
                  <div className="addform__inputarea disabled">
                    {totals.buildingFund.total.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="addform__list">
                <div>Grand Total</div>
                <div className="addform__input">
                  <div className="addform__inputarea disabled">
                    {(
                      totals.total +
                      currentReport?.meeting.total +
                      currentReport?.groups.total
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="addform__section">
          <div className="addform__column">
            <div className="addform__row">
              <label>(4601) Corps Groups</label>
              <div className="addform__list">
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
              <div className="addform__list">
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
              <div className="addform__list">
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
              <div className="addform__list">
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
              <div className="addform__list">
                <div>Y.P.L.</div>
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
              <div className="addform__list">
                <div>Other</div>
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

              <div className="addform__list">
                <div>Total Corps Groups</div>
                <div className="addform__input">
                  <div className="addform__inputarea disabled">
                    {groupTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="addform__column">
            <div className="addform__row">
              <label style={{ border: "none" }}>Cartrdige Report</label>
              <div
                className="addform__list-combined"
                style={{ textAlign: "left" }}
              >
                <div className="addform__cartridge-report">
                  <div></div>
                  <div>This Week</div>
                  <div>Prev. Week</div>
                  <div>Total to Date</div>

                  <div>Cartrdiges</div>
                  <div className="addform__cartridge-report--number disabled">
                    {totals.cartridge.total.toFixed(2)}
                  </div>
                  <div className="addform__cartridge-report--number disabled">
                    {prevReport?.cartridge.total.toFixed(2)}
                  </div>
                  <div className="addform__cartridge-report--number disabled"></div>

                  <div>Offerings</div>
                  <div className="addform__cartridge-report--number disabled">
                    {(
                      +totals.offering.total + +totals.thanksGiving.total
                    ).toFixed(2)}
                  </div>
                  <div className="addform__cartridge-report--number disabled">
                    {prevReport?.offering.total.toFixed(2)}
                  </div>
                  <div className="addform__cartridge-report--number disabled"></div>

                  <div>World Serv.</div>
                  <div className="addform__cartridge-report--number disabled">
                    {totals.selfDenial.total.toFixed(2)}
                  </div>
                  <div className="addform__cartridge-report--number disabled">
                    {prevReport?.selfDenial.total.toFixed(2)}
                  </div>
                  <div className="addform__cartridge-report--number disabled"></div>

                  <div>Building</div>
                  <div className="addform__cartridge-report--number disabled">
                    {totals.buildingFund.total.toFixed(2)}
                  </div>
                  <div className="addform__cartridge-report--number disabled">
                    {prevReport?.buildingFund.total.toFixed(2)}
                  </div>
                  <div className="addform__cartridge-report--number disabled"></div>

                  <div>Total</div>
                  <div className="addform__cartridge-report--number disabled">
                    {totals.total.toFixed(2)}
                  </div>
                  <div className="addform__cartridge-report--number disabled">
                    {prevReport?.total.toFixed(2)}
                  </div>
                  <div className="addform__cartridge-report--number disabled"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="addform__section"
          style={{ marginTop: "2rem", marginBottom: "3rem" }}
        >
          <div className="addform__column">
            <div className="addform__list-combined">
              <Field
                name="counter1"
                component={renderField}
                type="text"
                className={`${conditionalClass} report__counter`}
                isDisabled={!showForm}
                required="required"
              />
              <div style={{ borderTop: "1px solid #666" }}>Counter</div>
            </div>
          </div>
          <div className="addform__column">
            <div className="addform__list-combined">
              {/* <h3 style={{ padding: "0 0 0.5rem 1rem" }}>Young Chul Hong</h3> */}

              <Field
                name="counter2"
                component={renderField}
                type="text"
                className={`${conditionalClass} report__counter`}
                isDisabled={!showForm}
                required="required"
              />
              <div style={{ borderTop: "1px solid #666" }}>Counter</div>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            style={!showForm ? { display: "none" } : { width: "100%" }}
          >
            {currentReport ? "update" : "submit"}
          </button>
        </div>
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
      sundaySchool: currentReport?.meeting.sundaySchool || 0,
      holinessMeeting: currentReport?.meeting.holinessMeeting || 0,
      salvationMeeting: currentReport?.meeting.salvationMeeting || 0,
      midweekMeeting: currentReport?.meeting.midweekMeeting || 0,
      otherMeeting: currentReport?.meeting.otherMeeting || 0,
      adventureCorps: currentReport?.groups.adventureCorps || 0,
      jrLegion: currentReport?.groups.jrLegion || 0,
      sunbeams: currentReport?.groups.sunbeams || 0,
      girlGuards: currentReport?.groups.girlGuards || 0,
      ypl: currentReport?.groups.ypl || 0,
      otherGroup: currentReport?.groups.otherGroup || 0,
      counter1: capitalizeName(currentReport?.counter1),
      counter2: capitalizeName(currentReport?.counter2),
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
