import { CREATE_REPORT, FETCH_REPORTS } from "../actions/types";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REPORT:
      return { ...state, [action.payload.date]: action.payload };
    case FETCH_REPORTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default reducer;
