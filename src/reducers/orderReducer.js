import { SIGN_OUT, CREATE_ORDER, FETCH_ORDERS } from "../actions/types";

const initialState = {
  fetched: false,
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return {};
    case CREATE_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };
    case FETCH_ORDERS:
      return { ...state, fetched: true, orders: action.payload };
    default:
      return state;
  }
};
export default reducer;
