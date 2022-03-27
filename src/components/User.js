import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import { Button } from "react-bootstrap";
import renderField from "./renderField";

import { createOrder, fetchOrders, fetchUsers } from "../actions";

export const User = ({
  user,
  order,
  handleSubmit,
  createOrder,
  fetchOrders,
  fetchUsers,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchUsers();
  }, []);

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
  };

  const onUserSearchChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const renderChart = () => {
    const renderOrderRow = order.orders.map((el, i) => {
      return (
        <React.Fragment key={i}>
          <div>{el.name}</div>
          <div>{el.amountWeekly}</div>
          <div>{el.amountTithe}</div>
          <div>{el.amountSpecial}</div>
          <div></div>
          <Button variant="danger">X</Button>
        </React.Fragment>
      );
    });
    return (
      <div className="order__chart">
        <div>
          <label>name</label>
        </div>
        <div>
          <label>weekly</label>
        </div>
        <div>
          <label>tithe</label>
        </div>
        <div>
          <label>special</label>
        </div>
        <div>
          <label>aang</label>
        </div>
        <div></div>

        {renderOrderRow}
      </div>
    );
  };

  const renderUserSearch = () => {
    return (
      <div className="name-search__results">
        {searchResults.map((user, i) => {
          return (
            <div
              onClick={() => setSelectedUser(user)}
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

  const render = () => {
    return (
      <div className="order__container">
        <div className="order__container__col">
          <label>Week 12</label>
          {renderChart()}
        </div>
        <div className="order__container__col">
          <form
            onSubmit={handleSubmit(orderSubmit)}
            autoComplete="off"
            className="order__form"
          >
            <input type="date" />
            <div className="name-search">
              <input
                type="text"
                value={searchTerm}
                onChange={onUserSearchChange}
              ></input>
              {renderUserSearch()}
            </div>

            <div className="order__selector">
              <div className="order__selector__item">
                <div className="order__selector__item__label">weekly</div>
                <Field
                  name="amountWeekly"
                  component={renderField}
                  type="text"
                  label="amount"
                />
              </div>
              <div className="order__selector__item">
                <div className="order__selector__item__label">shipiljo</div>
                <Field
                  name="amountTithe"
                  component={renderField}
                  type="text"
                  label="amount"
                />
              </div>
              <div className="order__selector__item">
                <div className="order__selector__item__label">special</div>
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
        </div>
      </div>
    );
  };
  return render();
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
})(User);

export default connect(mapStateToProps, {
  createOrder,
  fetchOrders,
  fetchUsers,
})(wrappedForm);
