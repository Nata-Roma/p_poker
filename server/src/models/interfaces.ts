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

export interface IGameUser {
  user: string | IUserData;
  choice: number;
}

export interface IGameTaskScore {
  choice: number;
  score: number;
}

export interface IGameTask {
  taskName: string;
  users: Array<IGameUser>;
  score: Array<IGameTaskScore>;
}

export interface IUserChoice {
  taskName: string;
  userId: string;
  userChoice: number;
}
