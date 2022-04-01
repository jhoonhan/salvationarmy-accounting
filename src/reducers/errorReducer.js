import { CREATE_ERROR, CLEAR_ERROR } from "../actions/types";

const reducer = (state = null, action) => {
  switch (action.type) {
    case CREATE_ERROR:
      return { ...state, ...action.payload };
    case CLEAR_ERROR:
      return null;
    default:
      return state;
  }
};
export default reducer;
