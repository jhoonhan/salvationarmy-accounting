import React from "react";

const UserInfo = ({ selectedUser }) => {
  const render = () => {
    return <div className="ui__container">{selectedUser.name || ""}</div>;
  };
  return render();
};

export default UserInfo;
