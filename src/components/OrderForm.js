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
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const refNameSearch = useRef(null);

  useEffect(() => {
    console.log(sundaysInMonth(3, 2022));
    const today = new Date();
    console.log(today);
  }, []);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchResults([]);
      return;
    }
    if (searchTerm.length > 0) {
      const searchResults = user.users
        .filter((el) => {
          return (
            el.nameK[0].toLowerCase().match(searchTerm.toLowerCase()) ||
            el.name.toLowerCase().match(searchTerm.toLowerCase())
          );
        })
        .sort((a, b) => {
          return a.nameK.localeCompare(b.nameK);
        });
      setSearchResults(searchResults);
    }
  }, [searchTerm]);

  const sundaysInMonth = (month, year) => {
    const days = new Date(year, month, 0).getDate();
    let sundays = [8 - new Date(month + "/01/" + year).getDay()];
    for (var i = sundays[0] + 7; i < days; i += 7) {
      sundays.push(i);
    }
    return sundays;
  };

  const orderSubmit = (formValues) => {
    console.log(formValues);
    const values = {
      amountSpecial: !formValues.amountSpecial ? 0 : formValues.amountSpecial,
      amountTithe: !formValues.amountTithe ? 0 : formValues.amountTithe,
      amountWeekly: !formValues.amountWeekly ? 0 : formValues.amountWeekly,
    };
    const combinedData = {
      ...formValues,
      ...values,
    };
    createOrder(combinedData);
  };
  const onUserSearchChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };
  const onSelectUser = (user) => {
    change("name", user.name);
    change("nameK", user.nameK);
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
                user.name === formName.name && user.nameK === formName.nameK
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
      <input type="date" />
      <div className="order__week">
        <div className="order__week-selector">a</div>
        <div className="order__week-selector">a</div>
        <div className="order__week-selector">a</div>
        <div className="order__week-selector">a</div>
        <div className="order__week-selector">a</div>
        <div className="order__week-selector">a</div>
        <div className="order__week-selector">a</div>
      </div>
      <div className="name-search">
        <input
          ref={refNameSearch}
          type="text"
          value={searchTerm}
          onChange={onUserSearchChange}
        />
        {renderUserSearch()}
      </div>

      <label className="order__selector__item__label">User Info</label>
      <div className="order__user-info">
        <Field name="nameK" component={renderField} type="text" label="이름" />
        <Field name="name" component={renderField} type="text" label="name" />
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

const mapStateToProps = (state) => {
  return {
    initialValues: {},
    user: state.user,
    order: state.order,
    formName: {
      name: selector(state, "name"),
      nameK: selector(state, "nameK"),
    },
  };
};

export default connect(mapStateToProps, {
  createOrder,
  change,
})(wrappedForm);
