import { IChatMessage, IUserData } from "./interfaces";

class Room {
  private users: Array<IUserData> = [];
  private roomId: string;
  private chatMessages: Array<IChatMessage> = [];
  constructor(roomId: string) {
    this.roomId = roomId;
    console.log('new room created');
  }

  getRoomId = (): string | null => {
    if (this.roomId) return this.roomId;
    return null;
  };

  joinUser = (user: IUserData): void => {
    this.users.push(user);
  };
  leaveUser = (userId: string): void => {
    this.users = this.users.filter((item) => item.id !== userId);
  };

  getUser = (userId: string): IUserData => {
    const user = this.users.find((item) => item.id === userId);
    if (user) return user;
    return null;
  };

  getUsers = (): Array<IUserData> => {
    return this.users;
  };

  addMessage = (userId: string, message: string): void => {
    const userFound = this.users.find((item) => item.id === userId);
    if (userFound) {
      userFound.username;
      this.chatMessages.push({
        user: userFound,
        message,
      });
    }
  };
  getChatMessages = (): Array<IChatMessage> => {
    console.log('request for CHAT');
    return this.chatMessages;
  };
}

export default Room;
