import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./userReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  user: userReducer,
  order: orderReducer,
  form: formReducer,
});
