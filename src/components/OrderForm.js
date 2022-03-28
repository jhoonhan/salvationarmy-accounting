import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Field, reduxForm, change, formValueSelector } from "redux-form";
import renderField from "./renderField";
import UserForm from "./UserForm";

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
  // const [selectedUser, setSelectedUser] = useState({});
  // const [searchResults, setSearchResults] = useState([]);
  // const refNameSearch = useRef(null);

  useEffect(() => {}, []);

  // useEffect(() => {
  //   if (searchTerm.length === 0) {
  //     setSearchResults([]);
  //     return;
  //   }
  //   if (searchTerm.length > 0) {
  //     const searchResults = user.users
  //       .filter((el) => {
  //         let results;
  //         if (!el.nameK && !el.name) {
  //           results = null;
  //         }
  //         if (!el.nameK) {
  //           results = el.name.toLowerCase().match(searchTerm.toLowerCase());
  //         }

  //         if (el.nameK && el.name) {
  //           results =
  //             el.nameK[0].match(searchTerm) ||
  //             el.name.toLowerCase().match(searchTerm.toLowerCase());
  //         }
  //         return results;
  //       })
  //       .sort((a, b) => {
  //         let results;
  //         if (!a.nameK || !b.nameK) {
  //           results = a.name.localeCompare(b.name);
  //         } else {
  //           results = a.nameK.localeCompare(b.nameK);
  //         }
  //         return results;
  //       });
  //     setSearchResults(searchResults);
  //   }
  // }, [searchTerm, user.users]);

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
  // const onUserSearchChange = (event) => {
  //   event.preventDefault();
  //   setSearchTerm(event.target.value);
  // };
  // const onSelectUser = (user) => {
  //   setSelectedUser(user);
  //   change("name", user.name);
  //   change("nameK", user.nameK);
  // };

  // const onClickDeleteUser = (selectedUser) => {
  //   console.log(`delete ${selectedUser.nameK}`);
  //   const filteredUsers = user.users.filter((el) => el.id !== selectedUser.id);
  //   deleteUser(selectedUser.id, filteredUsers);
  // };

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

  // const renderUserSearch = () => {
  //   return (
  //     <div className="name-search__results">
  //       {searchResults.map((user, i) => {
  //         return (
  //           <div key={i} className="name-search__result">
  //             <div
  //               onClick={() => onSelectUser(user)}
  //               className="name-search__name"
  //               style={
  //                 user.name === selectedUser.name &&
  //                 user.nameK === selectedUser.nameK
  //                   ? { backgroundColor: "red" }
  //                   : {}
  //               }
  //             >
  //               {user.nameK} / {user.name}
  //             </div>
  //             <div
  //               onClick={() => onClickDeleteUser(user)}
  //               className="name--search__delete"
  //             >
  //               X
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // };

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

      {/* <div className="name-search">
        <input
          ref={refNameSearch}
          type="text"
          value={searchTerm}
          onChange={onUserSearchChange}
          onClick={() => setSearchTerm("")}
        />
        {renderUserSearch()}
      </div> */}

      <label className="order__amounts__item__label">User Info</label>
      <div className="order__user-info">
        <div>{selectedUser.nameK}</div>
        <div>{selectedUser.name}</div>
        {/* <Field name="nameK" component={renderField} type="text" label="이름" />
        <Field name="name" component={renderField} type="text" label="name" /> */}
      </div>

      <div className="order__order-type">
        <div
          style={orderType === "cash" ? { backgroundColor: "red" } : {}}
          onClick={() => {
            setOrderType("cash");
            change("checkNumber", "");
          }}
          className="order__order-type--cash"
        >
          cash
        </div>
        <div onClick={() => setOrderType("check")}>
          <Field
            name="checkNumber"
            component={renderField}
            label="check #"
            style={orderType === "check" ? { backgroundColor: "red" } : {}}
            required={orderType === "check" ? true : false}
          />
        </div>
      </div>
      <div className="order__amounts">
        <div className="order__amounts__item">
          <label className="order__amounts__item__label">offering</label>
          <Field
            name="amountOffering"
            component={renderField}
            type="number"
            label="0"
          />
        </div>
        <div className="order__amounts__item">
          <label className="order__amounts__item__label">cartridge</label>
          <Field
            name="amountCartridge"
            component={renderField}
            type="number"
            label="0"
          />
        </div>
        <div className="order__amounts__item">
          <label className="order__amounts__item__label">thanksgiving</label>
          <Field
            name="amountThanksgiving"
            component={renderField}
            type="number"
            label="0"
          />
        </div>
        <div className="order__amounts__item">
          <label className="order__amounts__item__label">self denial</label>
          <Field
            name="amountSelfDenial"
            component={renderField}
            type="number"
            label="0"
          />
        </div>
        <div className="order__amounts__item">
          <label className="order__amounts__item__label">building fund</label>
          <Field
            name="amountBuildingFund"
            component={renderField}
            type="number"
            label="0"
          />
        </div>
      </div>

      <button type="submit">Submit</button>
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
  deleteUser,
  change,
})(wrappedForm);
