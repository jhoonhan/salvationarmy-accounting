import { ERROR } from "../actions/types";

const initialValues = {};

const reducer = (state = initialValues, action) => {
  switch (action.type) {
    case ERROR:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
export default reducer;
