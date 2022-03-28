import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Field, reduxForm, change, formValueSelector } from "redux-form";
import renderField from "./renderField";
import { createOrder } from "../actions";
import { Button } from "react-bootstrap";

const OrderForm = ({
  user,
  formName,
  handleSubmit,
  createOrder,
  change,
  searchTerm,
  setSearchTerm,
  currentDate,
  setCurrentDate,
}) => {
  const [selectedUser, setSelectedUser] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const refNameSearch = useRef(null);

  useEffect(() => {}, []);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchResults([]);
      return;
    }
    if (searchTerm.length > 0) {
      const searchResults = user.users
        .filter((el) => {
          let results;
          if (!el.nameK) {
            results = el.name.toLowerCase().match(searchTerm.toLowerCase());
          }
          if (!el.name) {
            results = el.nameK[0].match(searchTerm);
          }

          if (el.nameK && el.name) {
            results =
              el.nameK[0].match(searchTerm) ||
              el.name.toLowerCase().match(searchTerm.toLowerCase());
          }
          return results;
        })
        .sort((a, b) => {
          let results;
          if (!a.nameK || !b.nameK) {
            results = a.name.localeCompare(b.name);
          } else {
            results = a.nameK.localeCompare(b.nameK);
          }
          return results;
        });
      setSearchResults(searchResults);
    }
  }, [searchTerm, user]);

  const orderSubmit = (formValues) => {
    const values = {
      amountSpecial: !formValues.amountSpecial ? 0 : formValues.amountSpecial,
      amountTithe: !formValues.amountTithe ? 0 : formValues.amountTithe,
      amountWeekly: !formValues.amountWeekly ? 0 : formValues.amountWeekly,
    };

    const combinedData = {
      ...formValues,
      ...values,
      name: selectedUser.name,
      nameK: selectedUser.nameK,
    };
    createOrder(combinedData);
  };
  const onUserSearchChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };
  const onSelectUser = (user) => {
    setSelectedUser(user);
    change("name", user.name);
    change("nameK", user.nameK);
  };

  const onDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate.getDay() !== 6) {
      console.error(`sunday must be selected`);
    }
    if (selectedDate.getDay() == 6) {
      console.log(`date changed`);
      setCurrentDate(e.target.value);
    }
  };

  const renderUserSearch = () => {
    return (
      <div className="name-search__results">
        {searchResults.map((user, i) => {
          return (
            <div
              onClick={() => onSelectUser(user)}
              key={i}
              className="name-search__name"
              style={
                user.name === selectedUser.name &&
                user.nameK === selectedUser.nameK
                  ? { backgroundColor: "red" }
                  : {}
              }
            >
              {user.nameK} / {user.name}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(orderSubmit)}
      autoComplete="off"
      className="order__form"
    >
      <Field
        name="date"
        type="date"
        component={renderField}
        onChange={onDateChange}
      />

      <div className="name-search">
        <input
          ref={refNameSearch}
          type="text"
          value={searchTerm}
          onChange={onUserSearchChange}
          onClick={() => setSearchTerm("")}
        />
        {renderUserSearch()}
      </div>

      <label className="order__selector__item__label">User Info</label>
      <div className="order__user-info">
        <div>{selectedUser.nameK}</div>
        <div>{selectedUser.name}</div>
        {/* <Field name="nameK" component={renderField} type="text" label="이름" />
        <Field name="name" component={renderField} type="text" label="name" /> */}
      </div>

      <div className="order__selector">
        <div className="order__selector__item">
          <label className="order__selector__item__label">weekly</label>
          <Field
            name="amountWeekly"
            component={renderField}
            type="number"
            label="amount"
          />
        </div>
        <div className="order__selector__item">
          <label className="order__selector__item__label">shipiljo</label>
          <Field
            name="amountTithe"
            component={renderField}
            type="number"
            label="amount"
          />
        </div>
        <div className="order__selector__item">
          <label className="order__selector__item__label">special</label>
          <Field
            name="amountSpecial"
            component={renderField}
            type="number"
            label="amount"
          />
        </div>
      </div>

      <Button type="submit">Submit</Button>
    </form>
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
  change,
})(wrappedForm);
