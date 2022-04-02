import { CREATE_REPORT, FETCH_REPORTS, PUT_REPORT } from "../actions/types";

const initialValues = {
  fetched: false,
  reports: [],
};

const reducer = (state = initialValues, action) => {
  switch (action.type) {
    case CREATE_REPORT:
      return { ...state, reports: [...state.reports, action.payload] };
    case FETCH_REPORTS:
      return { ...state, fetched: true, reports: action.payload };
    case PUT_REPORT:
      return { ...state, reports: action.payload };
    default:
      return state;
  }
};
export default reducer;
