import { SIGN_OUT, CREATE_ORDER } from "../actions/types";

const initialState = {
  date: null,
  counter: [],

  offeringCheckSub: 0,
  offeringCashSub: 0,
  offeringTotal: 0,
  cartridgeCheckSub: 0,
  cartridgeCashSub: 0,
  cartridgeTotal: 0,

  thanksGivingCheckSub: 0,
  thanksGivingCashSub: 0,
  thanksGivingTotal: 0,

  selfDenialCheckSub: 0,
  selfDenialCashSub: 0,
  selfDenialTotal: 0,

  buildingCheckSub: 0,
  buildingCashSub: 0,
  buildingTotal: 0,

  subTotalCheck: 0,
  subTotalCash: 0,
  total: 0,

  sundaySchool: 0,
  holinessMeeting: 0,
  salvationMeeting: 0,
  midweekMeeting: 0,
  otherMeeting: 0,
  meetingTotal: 0,

  adventureCorps: 0,
  jrLegion: 0,
  sunbeams: 0,
  girlGuard: 0,
  ypl: 0,
  otherGroup: 0,
  groupTotal: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};
export default reducer;
