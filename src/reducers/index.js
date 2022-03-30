import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import reportReducer from "./reportReducer";

export default combineReducers({
  user: userReducer,
  order: orderReducer,
  report: reportReducer,
  form: formReducer,
});
