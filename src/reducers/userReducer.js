import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_USER,
  EDIT_USER,
  FETCH_USERS,
  DELETE_USER,
} from "../actions/types";

const initialState = {
  fetched: false,
  users: [],
  currentUser: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { fetched: false, currentUser: action.payload };
    case SIGN_OUT:
      return { ...state, fetched: false, currentUser: false };
    case CREATE_USER:
      return { ...state, users: [...state.users, action.payload] };
    case FETCH_USERS:
      return { ...state, fetched: true, users: action.payload };
    case EDIT_USER:
      return { ...state, users: action.payload };
    case DELETE_USER:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default reducer;
