import { IChatMessage, IUserData } from '../models/interfaces';
import Room from '../models/roomModel';

class Rooms {
  private rooms: Array<Room> = [];
  constructor() {}

  createRoom = (roomId: string): void => {
    const room = new Room(roomId);
    this.rooms.push(room);
    console.log('new room in rooms, length: ', this.rooms.length);
  };

  getRooms = (): Array<Room> => {
    return this.rooms;
  };

  getRoomIds = (): Array<string> => {
    const roomIds = this.rooms.map((room) => room.getRoomId());
    console.log('get rooms Ids', roomIds);
    return roomIds;
  };

  getRoomId = (roomId: string): string => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    console.log('get room by Id');
    return roomId;
  };

  getRoomUsers = (roomId: string): Array<IUserData> => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    const users = room.getUsers();
    return users;
  };

  joinUserToRoom = (roomId: string, user: IUserData): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    room.joinUser(user);
  };

  leaveUserFromRoom = (roomId: string, userId: string): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    room.leaveUser(userId);
  };

  getRoomChat = (roomId: string): Array<IChatMessage> => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    const chat = room.getChatMessages();
    if (chat) return chat;
    return null;
  };

  addMessagetoRoomChat = (
    roomId: string,
    userId: string,
    message: string,
  ): void => {
    const room = this.rooms.find((room) => room.getRoomId() === roomId);
    room.addMessage(userId, message);
  };
}

const roomContoller = new Rooms();
export default roomContoller;
