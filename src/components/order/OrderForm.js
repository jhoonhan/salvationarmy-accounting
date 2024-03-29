import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Field, reduxForm, change } from "redux-form";
import renderField from "../helpers/renderField";
import { capitalizeName } from "../helpers/nameHelper";

import { createOrder, deleteUser } from "../../actions";

const OrderForm = ({
  selectedUser,
  setSelectedUser,
  // setSearchTerm,
  refUserSearch,
  currentDate,
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
      userId: selectedUser._id,
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
    setOrderType("cash");
    refUserSearch.current.focus();
  };

  const orderSubmitError = () => {
    // refUserSearch.current.style.border = "1px solid red";
    return "You must select an user";
  };

  const render = () => {
    return (
      <div className="ui__container">
        <div
          className="overlay--block"
          style={selectedUser?.name ? { display: "none" } : {}}
        >
          <h3>Select an User</h3>
        </div>
        <form
          onSubmit={handleSubmit(orderSubmit)}
          autoComplete="off"
          className="order__form"
        >
          <div className="order__form__row">
            <h3>Offering Info</h3>
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
                  className={`order__order-type--check ${
                    orderType === "check"
                      ? "order__order-type--check--placeholder"
                      : ""
                  }`}
                  required={orderType === "check" ? true : false}
                />
              </div>
            </div>
          </div>
          <div className="order__form__row">
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
                <div>Thksgiving</div>
                <Field
                  name="amountThanksgiving"
                  component={renderField}
                  type="number"
                  label="0"
                />
              </div>
              <div className="order__amounts__item">
                <div>Self & Wrd</div>
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
