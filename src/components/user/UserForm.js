import React, { useEffect, useRef, useState } from "react";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import { createUser, createOrder, deleteUser } from "../../actions";
import renderField from "../helpers/renderField";
import { combineFirstLast, capitalizeName } from "../helpers/nameHelper";
import useUserErrorController from "./useUserErrorController";

import { connect } from "react-redux";

const UserForm = ({
  user,
  userError,
  deleteUser,
  selectedUser,
  setSelectedUser,
  createUser,
  handleSubmit,
  refUserSearch,
  hideCreateForm,
  hide,
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user.users) return;
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
              el.nameK.match(searchTerm) ||
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

  const { type } = useUserErrorController(userError);

  const userSubmit = (formValues) => {
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
    createUser({ ...formValues, ...names });
  };

  const onSelectUser = (el) => {
    setSelectedUser(el);
    setSearchTerm(capitalizeName(el.name));

    change("dafuk", "wtf");
    change("name", el.name);
    change("nameK", el.nameK);
  };

  const onClickDeleteUser = (selectedUser) => {
    const filteredUsers = user.users.filter(
      (el) => el._id !== selectedUser._id
    );
    deleteUser(selectedUser._id, filteredUsers);
  };

  const onUserFormChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };
  const renderCreateUser = () => {
    return (
      <>
        <h3>Create New User</h3>
        <form
          onSubmit={handleSubmit(userSubmit)}
          autoComplete="off"
          className="order__form"
        >
          <div className="order__user-create">
            <Field
              name="lastname"
              component={renderField}
              type="text"
              label="Lastname"
              required="required"
            />
            <Field
              name="firstname"
              component={renderField}
              type="text"
              label="Firstname"
            />
            <Field
              name="nameK"
              component={renderField}
              type="text"
              label="이름"
            />

            <button type="submit">submit</button>
          </div>
        </form>
      </>
    );
  };
  const handleSearchTerm = () => {
    setSelectedUser(null);
    setSearchTerm("");
  };
  const renderUserForm = () => {
    return (
      <>
        <h3>Search user</h3>
        <div
          className="name-search__subcontainer"
          style={type === "noUserName" ? { border: "1px solid red" } : {}}
        >
          <input
            ref={refUserSearch}
            type="text"
            value={searchTerm}
            onChange={onUserFormChange}
            onFocus={handleSearchTerm}
            // onClick={() => setSearchTerm("")}
            // style={{ borderBottom: "none" }}
            placeholder="Search for Users"
          />
          <div className="name-search__results scroll-list--hover">
            {searchResults.map((el, i) => {
              return (
                <div key={i} className="name-search__result">
                  <div
                    onClick={() => onSelectUser(el)}
                    className="name-search__name"
                    style={
                      el.name === selectedUser?.name &&
                      el.nameK === selectedUser?.nameK
                        ? { color: "white", backgroundColor: "#4064ff" }
                        : {}
                    }
                  >
                    {el.nameK} / {capitalizeName(el.name)}
                  </div>
                  {/* <div
                    onClick={() => onClickDeleteUser(el)}
                    className="row__delete"
                  >
                    <span>X</span>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="ui__container">
      {hide && <div className="overlay--block"></div>}
      {hideCreateForm ? null : (
        <div className="name-create__container">{renderCreateUser()}</div>
      )}

      <div className="name-search__container">{renderUserForm()}</div>
    </div>
  );
};

const wrappedForm = reduxForm({
  form: "userForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(UserForm);

const mapStateToProps = ({ user, order, userError }) => {
  return {
    initialValues: {},
    user,
    order,
    userError,
  };
};

export default connect(mapStateToProps, {
  change,
  createUser,
  deleteUser,
})(wrappedForm);
