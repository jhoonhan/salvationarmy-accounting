import React from "react";
import { Field, reduxForm } from "redux-form";

import { connect } from "react-redux";
import renderField from "./renderField";

const DateSelector = ({ setCurrentDate, dispatch }) => {
  const onDateChange = (e) => {
    setCurrentDate(e.target.value);
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
  form: "orderForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(DateSelector);

const mapStateToProps = ({ user, form, order }) => {
  let prevSunday = new Date();
  prevSunday.setDate(prevSunday.getDate() - ((prevSunday.getDay() + 7) % 7));
  const currentDate = prevSunday.toISOString().split("T")[0];
  return {
    initialValues: {
      date: currentDate,
    },
    user,
    order,
  };
};

export default connect(mapStateToProps, {})(wrappedForm);
