import { reset } from "redux-form";
import server from "../apis/server";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_ORDER,
  FETCH_ORDERS,
  DELETE_ORDER,
  MARK_DELETE_ORDER,
  CREATE_USER,
  EDIT_USER,
  FETCH_USERS,
  DELETE_USER,
  CREATE_REPORT,
  FETCH_REPORTS,
  PUT_REPORT,
  CREATE_ERROR,
  CLEAR_ERROR,
} from "./types";

export const signIn = () => {
  localStorage.setItem("loggedIn", true);
  return {
    type: SIGN_IN,
    payload: "admin",
  };
};

export const signOut = () => {
  localStorage.removeItem("loggedIn");
  history.push("/");
  return {
    type: SIGN_OUT,
    payload: null,
  };
};

export const createError = (userError) => {
  const { name, message } = userError;
  return {
    type: CREATE_ERROR,
    payload: {
      name,
      message,
    },
  };
};

export const createOrder = (data) => async (dispatch) => {
  try {
    const res = await server.post("/order", data);
    dispatch({ type: CREATE_ORDER, payload: res.data.data });
    dispatch({ type: CLEAR_ERROR });
    dispatch(reset("orderForm"));
  } catch (error) {
    dispatch({ type: CREATE_ERROR, payload: error.response.data.error });
    console.error(error.response.data.error);
  }
};

export const fetchOrders = () => async (dispatch) => {
  try {
    const res = await server.get("/order/getall");
    dispatch({ type: FETCH_ORDERS, payload: res.data.data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrder = (orderId, orders) => async (dispatch) => {
  try {
    await server.delete(`/order/${orderId}`);
    dispatch({ type: DELETE_ORDER, payload: orders });
    dispatch({ type: MARK_DELETE_ORDER, payload: orderId });
  } catch (error) {
    console.error(error);
  }
};

export const createUser = (formValues) => async (dispatch) => {
  try {
    const res = await server.post("/user", formValues);
    dispatch({ type: CREATE_USER, payload: res.data.data });
    dispatch(reset("userForm"));
  } catch (error) {
    console.error(error);
  }
};
export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await server.get("/user/getall");
    dispatch({ type: FETCH_USERS, payload: res.data.data });
  } catch (error) {
    console.error(error);
  }
};
export const editUser = (userId, formValues) => async (dispatch, getState) => {
  try {
    const users = [...getState().user.users];
    let selectedUserIndex = getState().user.users.findIndex(
      (el) => el._id === userId
    );
    users[selectedUserIndex] = { ...users[selectedUserIndex], ...formValues };

    const res = await server.patch(`/user/${userId}`, formValues);
    if (res.data.status === "success") {
      dispatch({ type: EDIT_USER, payload: users });
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = (userId, users) => async (dispatch) => {
  try {
    await server.delete(`/user/${userId}`);
    dispatch({ type: DELETE_USER, payload: users });
  } catch (error) {
    console.error(error);
  }
};

export const createReport = (data) => async (dispatch) => {
  try {
    const res = await server.post("/report", data);
    dispatch({ type: CREATE_REPORT, payload: res.data.data });
  } catch (error) {
    console.error(error);
  }
};

export const fetchReports = () => async (dispatch) => {
  try {
    const res = await server.get("/report/getall");
    dispatch({ type: FETCH_REPORTS, payload: res.data.data });
  } catch (error) {
    console.error(error);
  }
};

export const putReport = (reportId, data) => async (dispatch, getState) => {
  try {
    const res = await server.put(`/report/${reportId}`, data);
    const filteredReports = getState().report.reports.filter(
      (report) => report._id !== res.data.data._id
    );
    const combinedReports = [...filteredReports, res.data.data];
    dispatch({ type: PUT_REPORT, payload: combinedReports });

    /// finalize delete order
    if (getState().order.markedOrders.length > 0) {
      const markedOrders = getState().order.markedOrders;
      await server.delete(`/order/batch/${markedOrders}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const resetForms = () => (dispatch) => {
  dispatch(reset("reportsForm"));
  dispatch(reset("orderForm"));
  dispatch(reset("userForm"));
};
