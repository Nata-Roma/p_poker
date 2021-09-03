import { appStore } from './store';

export const actionTypes = {
  SOCKET_CONNECT: 'SOCKET_CONNECT',
  SET_USER_ID: 'SET_USER_ID',
  SET_ROOM_ID: 'SET_ROOM_ID',
  SET_USER_ROLE: 'SET_USER_ROLE',
  SET_DEALER: 'SET_DEALER'
};

export const appReducer = (state = appStore, action) => {
  switch (action.type) {
    case actionTypes.SOCKET_CONNECT:
      return { ...state, socket: action.payload };

    case actionTypes.SET_USER_ID:
      return { ...state, userId: action.payload };

    case actionTypes.SET_ROOM_ID:
      return { ...state, roomId: action.payload };

      case actionTypes.SET_USER_ROLE:
        return { ...state, userRole: action.payload };

        case actionTypes.SET_DEALER:
        return { ...state, dealer: action.payload };
  
    default:
      return state;
  }
};
