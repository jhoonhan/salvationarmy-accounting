import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Field, reduxForm, change, formValueSelector } from "redux-form";
import renderField from "./renderField";
import { capitalizeName } from "./helpers/nameHelper";

import { createOrder, deleteUser } from "../actions";

const OrderForm = ({
  user,
  formName,
  handleSubmit,
  createOrder,
  deleteUser,
  change,
  searchTerm,
  setSearchTerm,
  currentDate,
  setCurrentDate,
  selectedUser,
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
      name: selectedUser.name,
      nameK: selectedUser.nameK,
      type: orderType,
      total:
        values.amountThanksgiving +
        values.amountCartridge +
        values.amountOffering +
        values.amountSelfDenial +
        values.amountBuildingFund,
    };
    createOrder(combinedData);
  };

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
              {selectedUser.nameK ? selectedUser.nameK : "이름"}
            </div>
            <div className="input-box">
              {selectedUser.name ? capitalizeName(selectedUser.name) : "Name"}
            </div>
          </div>
        </div>

        <div className="order__form__row">
          <label>Enter Amount</label>
          <div className="order__amounts">
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
              <div>Cartridge</div>
              <Field
                name="amountCartridge"
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
        <div className="order__form__row">
          <label>Select Type</label>
          <div className="order__order-type">
            <div
              style={
                orderType === "cash"
                  ? {
                      backgroundColor: "white",
                      border: "1px solid red",
                      color: "red",
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
                        backgroundColor: "white",
                        border: "1px solid red",
                        color: "red",
                      }
                    : { backgroundColor: "#efefef" }
                }
                required={orderType === "check" ? true : false}
              />
            </div>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const wrappedForm = reduxForm({
  form: "orderForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(OrderForm);

const selector = formValueSelector("orderForm");

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      date: ownProps.currentDate,
    },
    user: state.user,
    order: state.order,
  };
};

export default connect(mapStateToProps, {
  createOrder,
  deleteUser,
  change,
})(wrappedForm);
