import React, { useEffect, useState } from "react";
import { capitalizeName, lastFirstExt } from "../helpers/nameHelper";

const UserList = ({ users }) => {
  const [sortedUsers, setSortedUsers] = useState(
    users.sort((a, b) => {
      return a.lastname.localeCompare(b.lastname);
    })
  );

  useEffect(() => {}, []);

  const userRows = sortedUsers.map((user) => {
    return <li key={user._id}>{capitalizeName(lastFirstExt(user.name))}</li>;
  });

  const render = () => {
    return (
      <div className="user__list">
        <ul>{userRows}</ul>
      </div>
    );
  };
  return render();
};

export default UserList;
