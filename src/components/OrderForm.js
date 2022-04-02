import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Field, reduxForm, change, formValueSelector } from "redux-form";
import renderField from "./renderField";
import { capitalizeName } from "./helpers/nameHelper";

import { createOrder, deleteUser } from "../actions";

const OrderForm = ({
  selectedUser,
  setSelectedUser,
  setSearchTerm,
  currentDate,
  refUserSearch,
  userError,
  handleSubmit,
  createOrder,
  change,
}) => {
  const [orderType, setOrderType] = useState("cash");

  useEffect(() => {}, []);

  const orderSubmit = (formValues) => {
    const values = {
      amountThanksgiving: !formValues.amountThanksgiving
        ? 0
        : +formValues.amountThanksgiving,

      amountCartridge: !formValues.amountCartridge
        ? 0
        : +formValues.amountCartridge,

      amountOffering: !formValues.amountOffering
        ? 0
        : +formValues.amountOffering,

      amountSelfDenial: !formValues.amountSelfDenial
        ? 0
        : +formValues.amountSelfDenial,

      amountBuildingFund: !formValues.amountBuildingFund
        ? 0
        : +formValues.amountBuildingFund,
    };

    const combinedData = {
      ...formValues,
      ...values,
      lastname: selectedUser.lastname,
      firstname: selectedUser.firstname,
      name: selectedUser.name,
      nameK: selectedUser.nameK,
      type: orderType,
      date: currentDate,
      total:
        values.amountThanksgiving +
        values.amountCartridge +
        values.amountOffering +
        values.amountSelfDenial +
        values.amountBuildingFund,
    };
    createOrder(combinedData);
    setSelectedUser(null);
    refUserSearch.current.focus();
    setSearchTerm("");
  };

  const orderSubmitError = () => {
    // refUserSearch.current.style.border = "1px solid red";
    return "You must select an user";
  };

  const render = () => {
    return (
      <div className="ui__container">
        <form
          onSubmit={handleSubmit(orderSubmit)}
          autoComplete="off"
          className="order__form"
        >
          <div className="order__form__row">
            <label>User Info</label>
            <div className="order__user-info">
              <div className="input-box">
                {selectedUser?.nameK ? selectedUser.nameK : "이름"}
              </div>
              <div className="input-box">
                {selectedUser?.name
                  ? `${capitalizeName(selectedUser.lastname)}${
                      selectedUser.firstname
                        ? `, ${capitalizeName(selectedUser.firstname)}`
                        : ""
                    }`
                  : "Name"}
              </div>
            </div>
          </div>
          <div className="order__form__row">
            <label>Select Type</label>
            <div className="order__order-type">
              <div
                style={
                  orderType === "cash"
                    ? {
                        backgroundColor: "#4064ff",
                        color: "white",
                      }
                    : {}
                }
                onClick={() => {
                  setOrderType("cash");
                  change("checkNumber", "");
                }}
                className="order__order-type--cash"
              >
                Cash
              </div>
              <div onClick={() => setOrderType("check")}>
                <Field
                  name="checkNumber"
                  component={renderField}
                  label="Check #"
                  style={
                    orderType === "check"
                      ? {
                          backgroundColor: "#4064ff",
                          color: "white",
                        }
                      : {}
                  }
                  className="order__order-type--check"
                  required={orderType === "check" ? true : false}
                />
              </div>
            </div>
          </div>
          <div className="order__form__row">
            <label>Enter Amount</label>
            <div className="order__amounts">
              <div className="order__amounts__item">
                <div>Cartridge</div>
                <Field
                  name="amountCartridge"
                  component={renderField}
                  type="number"
                  label="0"
                />
              </div>
              <div className="order__amounts__item">
                <div>Offering</div>
                <Field
                  name="amountOffering"
                  component={renderField}
                  type="number"
                  label="0"
                />
              </div>
              <div className="order__amounts__item">
                <div>Thanksgiving</div>
                <Field
                  name="amountThanksgiving"
                  component={renderField}
                  type="number"
                  label="0"
                />
              </div>
              <div className="order__amounts__item">
                <div>Self Denial</div>
                <Field
                  name="amountSelfDenial"
                  component={renderField}
                  type="number"
                  label="0"
                />
              </div>
              <div className="order__amounts__item">
                <div>Building</div>
                <Field
                  name="amountBuildingFund"
                  component={renderField}
                  type="number"
                  label="0"
                />
              </div>
            </div>
          </div>

          <div className="error-message">
            {userError ? orderSubmitError() : ""}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

  return render();
};

const wrappedForm = reduxForm({
  form: "orderForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(OrderForm);

const mapStateToProps = (state) => {
  return {
    user: state.user,
    order: state.order,
    userError: state.userError,
  };
};

export default connect(mapStateToProps, {
  createOrder,
  deleteUser,
  change,
})(wrappedForm);
