import { SIGN_OUT, CREATE_ORDER } from "../actions/types";

const initialState = {
  date: null,
  counter: [],

  offering: {
    check: 0,
    cash: 0,
    total: 0,
  },

  cartridge: {
    check: 0,
    cash: 0,
    total: 0,
  },

  thanksGiving: {
    check: 0,
    cash: 0,
    total: 0,
  },

  selfDenial: {
    check: 0,
    cash: 0,
    total: 0,
  },
  buildingFund: {
    check: 0,
    cash: 0,
    total: 0,
  },

  meeting: {
    sundaySchool: 0,
    holinessMeeting: 0,
    salvationMeeting: 0,
    midweekMeeting: 0,
    otherMeeting: 0,
    total: 0,
  },

  groups: {
    adventureCorps: 0,
    jrLegion: 0,
    sunbeams: 0,
    girlGuard: 0,
    ypl: 0,
    otherGroup: 0,
    total: 0,
  },

  subTotalCheck: 0,
  subTotalCash: 0,
  total: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return { ...state, [action.payload.date]: action.payload };
    default:
      return state;
  }
};
export default reducer;
