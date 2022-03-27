import React from "react";
import { Button, Alert, Breadcrumb } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <div className="home__container">
        <Button>Enter This Week</Button>
        <div className="home__user-panel">
          <div className="home__user-input">
            <input></input>
            <Button>Search User</Button>
          </div>
          <Button>Add User</Button>
        </div>
        <div className="home__section">aang</div>
        <div className="home__section">aang</div>
      </div>
    </>
  );
};

export default Home;
