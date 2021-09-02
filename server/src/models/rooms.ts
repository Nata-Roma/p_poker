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

export const createRoom = (roomId: string) => {
  const room = roomsData.find((item) => item.roomId === roomId);
  if (!room) {
    roomsData.push({ roomId, users: [] });
  }
  console.log('Room CREATED', roomsData);
};

export const joinUser = (roomId: string, user: UserData) => {
  const roomIndex = roomsData.findIndex((item) => item.roomId === roomId);

  console.log(roomId, user);

  if (roomIndex >= 0) {
    console.log('room found', roomIndex);

    const rooms = [ ...roomsData ];
    const users = rooms[roomIndex].users;
    users.push(user);
    rooms[roomIndex] = {
      roomId,
      users,
    };
    roomsData = [ ...rooms ];
  }
  console.log('Rooms after user joined: ', JSON.stringify(roomsData));
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
  console.log('Rooms after user left: ', JSON.stringify(roomsData));
};
