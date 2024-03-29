import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import "../assets/scss/App.scss";

import Header from "./Header";
import ErrorModal from "./errors/ErrorModal";
import Signin from "./signin/Signin";
import Home from "./home/Home";
import Order from "./order/Order";
import User from "./user/User";
import Report from "./report/Report";

const App = ({ user }) => {
  const location = useLocation();
  const loggedIn = () => {
    return (
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/order" exact component={Order} />
        <Route path="/user" exact component={User} />
        <Route path="/report" exact component={Report} />
      </Switch>
    );
  };
  const loggedOut = () => {
    // return <Route path="/" exact component={Signin} />;
    return <Signin />;
  };
  const render = () => {
    return (
      <div className="app-container">
        <Route path="/" component={Header} />
        <ErrorModal />

        {!user.currentUser ? loggedOut() : loggedIn()}
      </div>
    );
  };

  return render();
};

const mapStateToProps = ({ user, userError }) => {
  return {
    user,
    userError,
  };
};

export default connect(mapStateToProps, {})(App);
