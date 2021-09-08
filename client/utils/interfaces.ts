import { Dispatch, SetStateAction } from 'react';

export interface IUser {
  username: string;
  userSurname: string;
  avatar: string;
  id: string;
  userRole: string;
  dealer: boolean;
  score?: string;
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
  user: IUser;
  message: string;
}

export interface IChat {
  roomId: string;
  chatMessages: Array<IChatMessage>;
}

export interface IApiGetLobbyInfo {
  chat: Array<IChatMessage>;
  users: Array<IUser>;
}
export interface IssueData {
  issueName: string;
  priority: string;
}

export interface IGameIssue {
  issueName: string;
  priority: string;
}

export interface IGameTimer {
  isTimer: boolean;
  minutes: number;
  seconds: number;
}

interface IGameCard {
  cardDeck: string;
  sequence: string;
  cardNumber: number;
  cardNumberStart: number;
  cardChange: boolean;
}
export interface IGameSettings {
  spring: string;
  issues: Array<IGameIssue>;
  timer: IGameTimer;
  card: IGameCard;
}

export interface IGameCardOption {
  name: string;
  sequence: Array<number>;
}

export interface IGamePagePlayer {
  player: string | IUser;
  choice: number;
}

export interface IGamePageIssueScore {
  choice: number;
  ratio: number;
}

export interface IGamePageIssue {
  issue: IGameIssue;
  players: Array<IGamePagePlayer>;
  score: Array<IGamePageIssueScore>;
  totalScore: number;
}

export interface IApiStartGame {
  spring: '';
  card: IGameCard;
  issues: Array<IGamePageIssue>;
  players: IGamePagePlayer;
  timer: IGameTimer;
}

export interface CreateIssuePopupProps {
  onIssueCreate: (issue: IssueData) => void;
}

export interface IssueListProps {
  onIssueCreate: (issue: IGameIssue) => void;
  onIssueDelete: (issue: string) => void;
  onIssueChangeEdit: (issue: issuePrevNext) => void;
  issues: Array<IGameIssue>;
}

export interface ChangeIssueProps {
  issueChange: boolean;
  onIssueChange: (changedIssue: IssueData) => void;
  setIssueChange: Dispatch<SetStateAction<boolean>>;
}

export interface issuePrevNext {
  prevValue: string;
  nextValue: string;
  priority: string;
}

export interface IStatistics {
  choice: number;
  ratio: number;
}

export interface UserCardProps {
  user: IUser;
  observer: boolean;
  score?: boolean;
  onRemoveUser?: (user: IUser) => void;
}

export interface KickPlayerProps {
  isOpenKickUser: boolean;
  onOpenPopUp: (isOpen: boolean) => void;
  deletedUser: IUser;
}

export interface ObserverListProps {
  users: Array<IUser>;
  onRemoveUser?: (user: IUser) => void;
}

export interface LobbyPartProps {
  users: Array<IUser>;
  onRemove:(user: IUser) => void;
}

export interface LobbyPartProps {
  users: Array<IUser>;
  onRemove:(user: IUser) => void;
}