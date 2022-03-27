import { SIGN_OUT, CREATE_USER, FETCH_USERS } from "../actions/types";

const initialState = {
  fetched: false,
  users: [],
  currentUser: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return { fetched: false, currentUser: null };
    case CREATE_USER:
      return { ...state, users: [...state.users, action.payload] };
    case FETCH_USERS:
      return { ...state, fetched: true, users: action.payload };
    default:
      return state;
  }
};

export default reducer;
