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
  room: IRoomInfo;
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

export interface IRoomInfo {
  roomId: string;
  roomName: string;
}
export interface IRoomCreateData {
  room: IRoomInfo;
  statusData: boolean;
}

export interface IRoomData {
  room: IRoomInfo;
  users: Array<IUser> | null;
}

export interface IChatMessage {
  user: IUser;
  message: string;
}

export interface IChat {
  room: IRoomInfo;
  chatMessages: Array<IChatMessage>;
}

export interface IApiGetLobbyInfo {
  chat: Array<IChatMessage>;
  users: Array<IUser>;
  error: string;
}
export interface IssueData {
  issueName: string;
  priority: string;
  issueDescription: string;
}

export interface IGameIssue {
  issueName: string;
  priority: string;
  issueDescription: string;
}

export interface IGameTimer {
  isTimer: boolean;
  time: number;
  // minutes: number;
  // seconds: number;
}

interface IGameCard {
  cardDeck: string;
  sequence: string;
  cardNumber: number;
  cardNumberStart: number;
  cardTurn: boolean;
}
export interface IGameSettings {
  spring: string;
  issues: Array<IGameIssue>;
  timer: IGameTimer;
  card: IGameCard;
  isAutoJoin: boolean;
  isStarted: boolean;
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
  amendedScore: number;
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
  issues: Array<IGameIssue>;
}

export interface IssueListProps {
  onIssueCreate: (issue: IGameIssue) => void;
  onIssueDelete: (issues: Array<IGameIssue>) => void;
  onIssueEdit: (issues: Array<IGameIssue>) => void;
  issues: Array<IGameIssue>;
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
  onKickUser: (user: IUser) => void;
}

export interface ChangeIssueProps {
  onIssueChangeClick: (changedIssue: IGameIssue) => void;
  issueSelected: IGameIssue;
  issues: Array<IGameIssue>;
}

export interface NewIssueGamePopupProps {
  onIssueCreate: (newIssue: IGameIssue) => void;
  onAddCloseIssue: () => void;
  isOpen: boolean;
  issues: Array<IGameIssue>;
}

export interface IActiveIssue {
  issueName: string;
  score: number;
}

export interface GamePageProps {
  gameData: IApiStartGame;
  userData: Array<IUser>;
}
export interface ITimerState {
  minutes: number;
  seconds: number;
}
