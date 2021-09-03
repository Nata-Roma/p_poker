export interface UserData {
  id: string;
  username: string;
  userSurname: string;
  avatar: string;
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

export const getRoomIds = (): Array<string> => {
  const roomIds = roomsData.reduce((acc: Array<string>, room) => {
    const roomId = room.roomId;
    acc.push(roomId);
    return acc;
  }, []);
  return roomIds;
};

export const createRoom = (roomId: string) => {
  const room = roomsData.find((item) => item.roomId === roomId);
  if (!room) {
    roomsData.push({ roomId, users: [] });
  }
};

export const joinUser = (roomId: string, user: UserData) => {
  const roomIndex = roomsData.findIndex((item) => item.roomId === roomId);

  if (roomIndex >= 0) {
    const rooms = [ ...roomsData ];
    const users = rooms[roomIndex].users;
    users.push(user);
    rooms[roomIndex] = {
      roomId,
      users,
    };
    roomsData = [ ...rooms ];
  }
};

export const leaveUser = (roomId: string, userId: string) => {
  const roomIndex = roomsData.findIndex((item) => item.roomId === roomId);

  if (roomIndex >= 0) {
    const rooms = [ ...roomsData ];
    let users = rooms[roomIndex].users;
    users = users.filter((item) => item.id !== userId);
    rooms[roomIndex] = {
      roomId,
      users,
    };
    roomsData = [ ...rooms ];
  }
};

export const getUser = (roomId: string, userId: string): UserData => {
  const roomIndex = roomsData.findIndex((item) => item.roomId === roomId);
  if (roomIndex >= 0) {
    const users = roomsData[roomIndex].users;
    const user = users.find((item) => item.id === userId);

    if (user) return user;
    return null;
  }
};
