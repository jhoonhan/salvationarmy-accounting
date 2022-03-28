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
} from "./types";

export const signOut = () => {
  return {
    type: SIGN_OUT,
    paylod: "aaang",
  };
};

export const createOrder = (data) => async (dispatch) => {
  try {
    console.log(data);
    const res = await server.post("/orders", data);

    dispatch({ type: CREATE_ORDER, payload: data });
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
    console.log(res.data);
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
