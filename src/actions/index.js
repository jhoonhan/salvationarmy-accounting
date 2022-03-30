import { reset } from "redux-form";
import server from "../apis/server";
import {
  SIGN_OUT,
  CREATE_ORDER,
  FETCH_ORDER,
  FETCH_ORDERS,
  DELETE_ORDER,
  CREATE_USER,
  FETCH_USER,
  FETCH_USERS,
  DELETE_USER,
  CREATE_REPORT,
  FETCH_REPORTS,
} from "./types";

export const signOut = () => {
  return {
    type: SIGN_OUT,
    paylod: "aaang",
  };
};

export const createOrder = (data) => async (dispatch) => {
  try {
    const res = await server.post("/order", data);
    console.log(res.data.data.data);
    dispatch({ type: CREATE_ORDER, payload: res.data.data.data });
    dispatch(reset("orderForm"));
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await server.get("/user/getall");
    dispatch({ type: FETCH_USERS, payload: res.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = (formValues) => async (dispatch) => {
  try {
    console.log(formValues);
    await server.post("/user", formValues);
    dispatch({ type: CREATE_USER, payload: formValues });
    dispatch(reset("userForm"));
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
    console.log(data);
    const res = await server.post("/report", data);
    console.log(res.data);
    dispatch({ type: CREATE_REPORT, payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const fetchReports = () => async (dispatch) => {
  try {
    const obj = {};
    const res = await server.get("/report/getall");
    res.data.data.forEach((order) => {
      obj[order.date] = { ...order };
    });
    dispatch({ type: FETCH_REPORTS, payload: obj });
  } catch (error) {
    console.error(error);
  }
};
