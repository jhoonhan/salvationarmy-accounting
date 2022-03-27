import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/scss/App.scss";

import Header from "./Header";
import Home from "./Home";
import User from "./User";

const App = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <Route path="/" component={Header} />

      <Switch location={location} key={location.pathname}>
        <Route path="/" exact component={Home} />
        <Route path="/user" exact component={User} />
      </Switch>
    </div>
  );
};

export default App;
