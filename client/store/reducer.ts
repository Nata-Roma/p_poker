import { appStore, AppStore } from './store';

export const actionTypes = {
  SOCKET_CONNECT: 'SOCKET_CONNECT',
  SET_USER_ID: 'SET_USER_ID',
  SET_ROOM_ID: 'SET_ROOM_ID',
};

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

export const appReducer = (state = appStore, action) => {
  switch (action.type) {
    case actionTypes.SOCKET_CONNECT:
      return { ...state, socket: action.payload };
    case actionTypes.SET_USER_ID:
      return { ...state, userId: action.payload };
    case actionTypes.SET_ROOM_ID:
      return { ...state, roomId: action.payload };
    default:
      return state;
  }
};
