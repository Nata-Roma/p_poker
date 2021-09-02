export interface UserData {
  id: string;
  username: string;
  userSurname: string;
  avatar?: string;
}

export interface RoomData {
  roomId: string;
  users: Array<UserData> | null;
}

let roomsData = [] as Array<RoomData>;

export const getRoom = (id: string): RoomData | null => {
  if (roomsData.length) {
    const room = roomsData.find((item) => item.roomId === id);
    if (room) return room;
    return null;
  }
  return null;
};

export const getRooms = (): Array<RoomData> => {
  return roomsData;
};

export const getRoomIdsOnly = (): Array<string> => {
  const roomIds = roomsData.reduce((acc: Array<string>, room) => {
    const roomId = room.roomId;
    acc.push(roomId);
    return acc;
  }, []);
  return roomIds;
};

export const setRoom = (roomId: string, user: UserData) => {
  const room = roomsData.find((item) => item.roomId === roomId);
  if (!room) {
    roomsData.push({ roomId, users: [ user ] });
  }
};

export const joinUser = (roomId: string, user: UserData) => {
  const roomIndex = roomsData.findIndex((item) => item.roomId === roomId);

  if (roomIndex) {
    const room = { ...roomsData[roomIndex] };
    room.users.push(user);
    roomsData = [ ...roomsData, (roomsData[roomIndex] = room) ];
  }
};

export const leaveUser = (roomId: string, user: UserData) => {
  const roomIndex = roomsData.findIndex((item) => item.roomId === roomId);

  if (roomIndex) {
    const room = { ...roomsData[roomIndex] };
    const newUsers = room.users.filter((item) => item.id !== user.id);
    room.users = newUsers;
    roomsData = [ ...roomsData, (roomsData[roomIndex] = room) ];
  }
};
