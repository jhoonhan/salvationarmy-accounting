import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import renderField from "../helpers/renderField";

import { capitalizeName, combineFirstLast } from "../helpers/nameHelper";
import { editUser } from "../../actions";

const UserInfo = ({ selectedUser, change, handleSubmit, editUser }) => {
  useEffect(() => {
    if (!selectedUser.name) return;
    change("firstname", capitalizeName(selectedUser.firstname));
    change("lastname", capitalizeName(selectedUser.lastname));
    change("nameK", capitalizeName(selectedUser.nameK));
    change("position", capitalizeName(selectedUser.position));
    change("positionK", capitalizeName(selectedUser.positionK));
  }, [selectedUser]);

  const userEditSubmit = (formValues) => {
    let firstname;
    if (!formValues.firstname) {
      firstname = "";
    } else {
      firstname = formValues.firstname.trim().toLowerCase();
    }

    const lastname = formValues.lastname.trim().toLowerCase();
    const names = {
      name: combineFirstLast(firstname, lastname).toLowerCase(),
      firstname,
      lastname,
    };

    editUser(selectedUser._id, { ...formValues, ...names });
  };

  const render = () => {
    return (
      <div className="ui__container">
        <form
          onSubmit={handleSubmit(userEditSubmit)}
          className="userInfo__container flex--column"
        >
          <div
            className="flex--column"
            style={{ alignItems: "flex-start", gap: "2rem" }}
          >
            <div
              className="grid--column--3--eq"
              style={{ gap: "2rem", width: "100%" }}
            >
              <div>
                <h3>이름</h3>
                <Field
                  name="nameK"
                  component={renderField}
                  type="text"
                  label="이름"
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
                />
              </div>
              <div>
                <h3>직함</h3>
                <Field
                  name="positionK"
                  component={renderField}
                  type="text"
                  label="직함"
                />
              </div>
              <div style={{ alignSelf: "flex-end" }}>
                <button type="submit" style={{ width: "100%" }}>
                  Edit User
                </button>
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
  editUser,
})(wrappedForm);
