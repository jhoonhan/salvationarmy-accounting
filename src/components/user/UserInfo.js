import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import renderField from "../helpers/renderField";

import { capitalizeName } from "../helpers/nameHelper";

const UserInfo = ({ selectedUser, change }) => {
  useEffect(() => {
    if (!selectedUser.name) return;
    // setInputUser({ name: selectedUser.name, nameK: selectedUser.nameK });
    change("firstname", capitalizeName(selectedUser.firstname));
    change("lastname", capitalizeName(selectedUser.lastname));
    change("nameK", capitalizeName(selectedUser.nameK));
    change("position", capitalizeName(selectedUser.position));
    change("positionK", capitalizeName(selectedUser.positionK));
  }, [selectedUser, change]);

  const render = () => {
    return (
      <div className="ui__container">
        <form className="userInfo__container flex--column">
          <div
            className="flex--column"
            style={{ alignItems: "flex-start", gap: "2rem" }}
          >
            <div className="flex--row" style={{ gap: "1rem" }}>
              <div>
                <h3>이름</h3>
                <Field
                  name="nameK"
                  component={renderField}
                  type="text"
                  label="이름"
                  required="required"
                />
              </div>
              <div>
                <h3>Firstname</h3>
                <Field
                  name="firstname"
                  component={renderField}
                  type="text"
                  label="Firstname"
                  required="required"
                />
              </div>

              <div>
                <h3>Lastname</h3>
                <Field
                  name="lastname"
                  component={renderField}
                  type="text"
                  label="Lastname"
                  required="required"
                />
              </div>
            </div>
            <div
              className="grid--column--3--eq"
              style={{ width: "100%", gap: "2rem" }}
            >
              <div>
                <h3>Position</h3>
                <Field
                  name="position"
                  component={renderField}
                  type="text"
                  label="Position"
                  required="required"
                />
              </div>
              <div>
                <h3>직함</h3>
                <Field
                  name="positionK"
                  component={renderField}
                  type="text"
                  label="직함"
                  required="required"
                />
              </div>
              <div style={{ alignSelf: "flex-end" }}>
                <button style={{ width: "100%" }}>Edit User</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };
  return render();
};

const wrappedForm = reduxForm({
  form: "userEditForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(UserInfo);

const mapStateToProps = ({ userError }) => {
  return {
    initialValues: {},
    userError,
  };
};

export default connect(mapStateToProps, {
  change,
})(wrappedForm);
