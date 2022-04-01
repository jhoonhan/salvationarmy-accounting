import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "../assets/scss/App.scss";

import Header from "./Header";
import ErrorModal from "./ErrorModal";
import Home from "./Home";
import Order from "./Order";

const App = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <Route path="/" component={Header} />
      <Route path="/" component={ErrorModal} />

      <Switch location={location} key={location.pathname}>
        <Route path="/" exact component={Home} />
        <Route path="/order" exact component={Order} />
      </Switch>
    </div>
  );
};

export default App;
