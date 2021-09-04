import { IChatMessage, IUserData } from './interfaces';

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
    const userFoundIndex = this.findUser(user.id);
    console.log('userFound', userFoundIndex);
    if (userFoundIndex >= 0) {
      const leftPart = this.users.slice(0, userFoundIndex);
      leftPart.push(user);
      const rightPart = this.users.slice(userFoundIndex + 1);
      this.users = leftPart.concat(rightPart);
      console.log('left', leftPart);
      console.log('right', rightPart);
      console.log('user', user);
      
    } else {
      this.users.push(user);
    }
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

  findUser = (userId: string): number => {
    const userFoundIndex = this.users.findIndex((user) => user.id === userId);
console.log('found user', userFoundIndex);
console.log('all users', this.users);


    if (userFoundIndex >= 0) return userFoundIndex;
    return -1;
  };
}

export default Room;
