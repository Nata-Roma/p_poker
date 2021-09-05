import { actionTypes } from './reducer';

export const setRoomId = (id: string | Array<string>) => {
  if (typeof id === 'string') {
    return {
      type: actionTypes.SET_ROOM_ID,
      payload: id,
    };
  }
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

export const setUsername = (username: string) => {
  return {
    type: actionTypes.SET_USER_NAME,
    payload: username,
  };
};

export const setUserSurname = (userSurname: string) => {
  return {
    type: actionTypes.SET_USER_SURNAME,
    payload: userSurname,
  };
};

export const setUserAvatar = (avatar: string) => {
  return {
    type: actionTypes.SET_USER_AVATAR,
    payload: avatar,
  };
};
