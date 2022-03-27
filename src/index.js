import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import reduxThunk from "redux-thunk";
import history from "./history";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import reportWebVitals from "./reportWebVitals";

import "./index.scss";

import App from "./components/App";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
