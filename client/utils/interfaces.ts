export interface IUser {
  username: string;
  userSurname: string;
  avatar: string;
  id: string;
}

export interface IUserCreate {
  roomId: string;
  user: IUser
  };