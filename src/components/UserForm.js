import React, { useEffect, useRef, useState } from "react";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import { createUser, createOrder, deleteUser } from "../actions";
import renderField from "./renderField";

import { connect } from "react-redux";

const UserSearch = ({
  user,
  searchTerm,
  setSearchTerm,
  deleteUser,
  selectedUser,
  setSelectedUser,
  createUser,
  handleSubmit,
}) => {
  const refNameSearch = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const sortedUsers = user.users.sort((a, b) => {
      let results;
      if (!a.nameK || !b.nameK) {
        results = a.name.localeCompare(b.name);
      } else {
        results = a.nameK.localeCompare(b.nameK);
      }
      return results;
    });

    if (searchTerm.length === 0) {
      setSearchResults(sortedUsers);
      return;
    }
    if (searchTerm.length > 0) {
      const searchResults = user.users
        .filter((el) => {
          let results;
          if (!el.nameK && !el.name) {
            results = null;
          }
          if (!el.nameK) {
            results = el.name.toLowerCase().match(searchTerm.toLowerCase());
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
  }, [searchTerm, user.users]);

  const userSubmit = (formValues) => {
    createUser(formValues);
  };

  const onSelectUser = (el) => {
    setSelectedUser(el);
    change("name", el.name);
    change("nameK", el.nameK);
  };

  const onClickDeleteUser = (selectedUser) => {
    const filteredUsers = user.users.filter(
      (el) => el._id !== selectedUser._id
    );
    deleteUser(selectedUser._id, filteredUsers);
  };

  const onUserSearchChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const renderUserSearch = () => {
    return (
      <div className="name-search__results">
        {searchResults.map((el, i) => {
          return (
            <div key={i} className="name-search__result">
              <div
                onClick={() => onSelectUser(el)}
                className="name-search__name"
                style={
                  el.name === selectedUser.name &&
                  el.nameK === selectedUser.nameK
                    ? { color: "red" }
                    : {}
                }
              >
                {el.nameK} / {el.name}
              </div>
              <div
                onClick={() => onClickDeleteUser(el)}
                className="name--search__delete"
              >
                DELETE
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="ui__container">
        <div className="name-search">
          <label>Search user</label>
          <input
            ref={refNameSearch}
            type="text"
            value={searchTerm}
            onChange={onUserSearchChange}
            onClick={() => setSearchTerm("")}
          />
          {renderUserSearch()}
        </div>
        <div>
          <label>Create New User</label>
          <form
            onSubmit={handleSubmit(userSubmit)}
            autoComplete="off"
            className="order__form"
          >
            <div className="order__user-info">
              <Field
                name="nameK"
                component={renderField}
                type="text"
                label="이름"
              />
              <Field
                name="name"
                component={renderField}
                type="text"
                label="name"
              />
              <button type="submit">submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const wrappedForm = reduxForm({
  form: "userForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(UserSearch);

const mapStateToProps = (state) => {
  return {
    initialValues: {},
    user: state.user,
    order: state.order,
  };
};

export default connect(mapStateToProps, {
  change,
  createUser,
  deleteUser,
})(wrappedForm);
