export interface IUser {
  username: string;
  userSurname: string;
  avatar: string;
  id: string;
  userRole: string;
  dealer: boolean;
}

export interface IUserCreate {
  roomId: string;
  user: IUser;
}

export interface IDialogUser {
  nameData: string;
  statusData: boolean;
}

export interface IDialogUsers {
  username: IDialogUser;
  userSurname: IDialogUser;
  avatar: string;
}

export interface IRoomData {
  roomId: string;
  users: Array<IUser> | null;
}

export interface IChatMessage {
  user: IUser
  message: string;
}

export interface IChat {
  roomId: string;
  chatMessages: Array<IChatMessage>;
}

export interface IssueData {
  issueName: string;
  priority: string;
  id: string;
}

export interface CreateIssuePopupProps {
  onCreate: (issue: IssueData) => void;
}