import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Field, reduxForm, change } from "redux-form";
import renderField from "./renderField";
import { createOrder } from "../actions";
import { Button } from "react-bootstrap";

const OrderForm = ({
  user,
  handleSubmit,
  createOrder,
  change,
  searchTerm,
  setSearchTerm,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const refNameSearch = useRef(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const searchResults = user.users.filter((el) => {
        return el.name.toLowerCase().match(searchTerm.toLowerCase());
      });
      setSearchResults(searchResults);
    }
  }, [searchTerm]);

  const orderSubmit = (formValues) => {
    const combinedData = {
      ...formValues,
      ...selectedUser,
    };
    createOrder(combinedData);
    setSelectedUser(null);
  };
  const onUserSearchChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };
  const onSelectUser = (user) => {
    setSelectedUser(user);
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
                user.name === selectedUser?.name
                  ? { backgroundColor: "red" }
                  : {}
              }
            >
              {user.name}
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
        <div className="order__user-infobox">
          {selectedUser ? selectedUser.nameK : " "}
        </div>
        <div className="order__user-infobox">
          {selectedUser ? selectedUser.name : " "}
        </div>
      </div>

      <div className="order__selector">
        <div className="order__selector__item">
          <label className="order__selector__item__label">weekly</label>
          <Field
            name="amountWeekly"
            component={renderField}
            type="text"
            label="amount"
          />
        </div>
        <div className="order__selector__item">
          <label className="order__selector__item__label">shipiljo</label>
          <Field
            name="amountTithe"
            component={renderField}
            type="text"
            label="amount"
          />
        </div>
        <div className="order__selector__item">
          <label className="order__selector__item__label">special</label>
          <Field
            name="amountSpecial"
            component={renderField}
            type="text"
            label="amount"
          />
        </div>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

const mapStateToProps = ({ user, form, order }) => {
  return {
    initialValues: {
      amount: 0,
    },
    user,
    order,
  };
};

const wrappedForm = reduxForm({
  form: "orderForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(OrderForm);

export default connect(mapStateToProps, {
  createOrder,
  change,
})(wrappedForm);
