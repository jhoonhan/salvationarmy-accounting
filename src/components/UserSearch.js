import React, { useEffect, useRef, useState } from "react";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import { createOrder, deleteUser } from "../actions";

import { connect } from "react-redux";

const UserSearch = ({
  user,
  searchTerm,
  setSearchTerm,
  deleteUser,
  selectedUser,
  setSelectedUser,
}) => {
  const refNameSearch = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchResults([]);
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

  const onSelectUser = (el) => {
    setSelectedUser(el);
    change("name", el.name);
    change("nameK", el.nameK);
  };

  const onClickDeleteUser = (selectedUser) => {
    console.log(`delete ${selectedUser.nameK}`);
    const filteredUsers = user.users.filter((el) => el.id !== selectedUser.id);
    deleteUser(selectedUser.id, filteredUsers);
  };

  const onUserSearchChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const renderUserSearch = () => {
    console.log(selectedUser);
    return (
      <div className="name-search__results">
        {searchResults.map((el, i) => {
          console.log(el);
          return (
            <div key={i} className="name-search__result">
              <div
                onClick={() => onSelectUser(el)}
                className="name-search__name"
                style={
                  el.name === selectedUser.name &&
                  el.nameK === selectedUser.nameK
                    ? { backgroundColor: "red" }
                    : {}
                }
              >
                {el.nameK} / {el.name}
              </div>
              <div
                onClick={() => onClickDeleteUser(el)}
                className="name--search__delete"
              >
                X
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
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
  );
};

const mapStateToProps = (state) => {
  return { user: state.user, order: state.order };
};

export default connect(mapStateToProps, { deleteUser })(UserSearch);
