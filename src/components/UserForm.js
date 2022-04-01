import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Field, reduxForm, change } from "redux-form";
import renderField from "./renderField";
import { createUser } from "../actions";

const UserForm = ({ createUser, handleSubmit }) => {
  const userSubmit = (formValues) => {
    createUser(formValues);
  };

  const render = () => {
    return (
      <div className="ui__container">
        <label>Create New User</label>
        <form
          onSubmit={handleSubmit(userSubmit)}
          autoComplete="off"
          className="order__form"
        >
          <div className="order__user-info">
            <Field
              name="nameK"
              component={renderField}
              type="text"
              label="이름"
            />
            <Field
              name="name"
              component={renderField}
              type="text"
              label="name"
            />
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    );
  };
  return render();
};

const wrappedForm = reduxForm({
  form: "userForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(UserForm);

const mapStateToProps = (state) => {
  return {
    initialValues: {},
  };
};

export default connect(mapStateToProps, {
  change,
  createUser,
})(wrappedForm);
