import { actionTypes } from "./reducer";

export const setRoomId = (id: string) => {
  return {
    type: actionTypes.SET_ROOM_ID,
    payload: id,
  };
};

export const setUserId = (id: string) => {
  return {
    type: actionTypes.SET_USER_ID,
    payload: id,
  };
};

export const setUserRole = (role: string) => {
  return {
    type: actionTypes.SET_USER_ROLE,
    payload: role,
  };
};

export const setDealer = (status: boolean) => {
  return {
    type: actionTypes.SET_DEALER,
    payload: status,
  };
};

export const setSpring = (spring: string) => {
  return {
    type: actionTypes.SET_SPRING,
    payload: spring,
  };
};