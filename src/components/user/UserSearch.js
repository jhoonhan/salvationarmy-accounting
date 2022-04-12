import React, { useEffect, useState } from "react";
import { capitalizeName } from "../helpers/nameHelper";

const UserSearch = ({
  users,
  type,
  refUserSearch,
  searchTerm,
  onUserFormChange,
  setSearchTerm,
  selectedUser,
  onSelectUser,
  onClickDeleteUser,
}) => {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (!users) return;
    const sortedUsers = users.sort((a, b) => {
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
      const searchResults = users
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
  }, [searchTerm, users]);

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
            onClick={() => setSearchTerm("")}
            // style={{ borderBottom: "none" }}
            placeholder="Search for Users"
          />
          <div className="name-search__results">
            {searchResults.map((el, i) => {
              return (
                <div
                  key={i}
                  className="name-search__result"
                  style={
                    el.name === selectedUser?.name &&
                    el.nameK === selectedUser?.nameK
                      ? { color: "white", backgroundColor: "#4064ff" }
                      : {}
                  }
                >
                  <div
                    onClick={() => onSelectUser(el)}
                    className="name-search__name"
                  >
                    {el.nameK} / {capitalizeName(el.name)}
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
        </div>
      </>
    );
  };
  return renderUserForm();
};

export default UserSearch;
