import React from "react";
import { Field, reduxForm } from "redux-form";

import { connect } from "react-redux";
import renderField from "./renderField";

const DateSelector = ({ setDates, dispatch }) => {
  const onDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate.getDay() !== 6) {
      dispatch({
        type: "CREATE_ERROR",
        payload: { name: "selectSunday", message: "You must select Sunday" },
      });
    }
    if (selectedDate.getDay() === 6) {
      setDates(e.target.value);
      dispatch({ type: "CLEAR_ERROR" });
    }
  };

  return (
    <div className="ui__container">
      <div>
        <label>Select date</label>
        <Field
          name="date"
          type="date"
          component={renderField}
          onChange={onDateChange}
        />
      </div>
    </div>
  );
};

const wrappedForm = reduxForm({
  form: "dateForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(DateSelector);

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      date: ownProps.currentDate,
    },
    user: state.suer,
    order: state.order,
  };
};

export default connect(mapStateToProps, {})(wrappedForm);
