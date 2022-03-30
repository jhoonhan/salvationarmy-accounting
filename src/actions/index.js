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
} from "./types";

export const signOut = () => {
  return {
    type: SIGN_OUT,
    paylod: "aaang",
  };
};

export const createOrder = (data) => async (dispatch) => {
  try {
    const res = await server.post("/orders", data);
    dispatch({ type: CREATE_ORDER, payload: res.data });
    dispatch(reset("orderForm"));
  } catch (error) {
    console.error(error);
  }
};

export const fetchOrders = () => async (dispatch) => {
  try {
    const res = await server.get("/orders");
    dispatch({ type: FETCH_ORDERS, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrder = (orderId, orders) => async (dispatch) => {
  try {
    const res = await server.delete(`/orders/${orderId}`);
    dispatch({ type: DELETE_ORDER, payload: orders });
  } catch (error) {
    console.error(error);
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await server.get("/users");
    dispatch({ type: FETCH_USERS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = (formValues) => async (dispatch) => {
  try {
    await server.post("/users", formValues);
    dispatch({ type: CREATE_USER, payload: formValues });
    dispatch(reset("userForm"));
  } catch (error) {
    console.error(error);
  }
};
export const deleteUser = (userId, users) => async (dispatch) => {
  try {
    console.log(userId);
    console.log(users);
    await server.delete(`/users/${userId}`);
    dispatch({ type: DELETE_USER, payload: users });
  } catch (error) {
    console.error(error);
  }
};

export const createReport = (data) => async (dispatch) => {
  try {
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
