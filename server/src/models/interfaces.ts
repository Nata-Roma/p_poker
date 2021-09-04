export interface IUserData {
  username: string;
  userSurname: string;
  avatar: string;
  id: string;
  userRole: string;
  dealer: boolean;
}

export interface IChatMessage {
  user: IUserData;
  message: string;
}
