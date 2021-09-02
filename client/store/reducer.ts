export const reducer = (state, action) => {
  switch (action.type) {
    case 'SOCKET_CONNECT':
      return { ...state, socket: action.payload };
    default:
      return state;
  }
};
