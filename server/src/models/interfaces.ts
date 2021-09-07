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

export interface IIssue {
  issueName: string;
  priority: string;
}

export interface IGameTimer {
  isTimer: boolean;
  minutes: number;
  seconds: number;
}

export interface IGameCard {
  cardDeck: string;
  sequence: string;
  cardNumber: number;
  cardChange: boolean;
}

export interface IGameSettings {
  issues: Array<IIssue>;
  timer: IGameTimer;
  card: IGameCard;
}

export interface IGamePlayer {
  player: string | IUserData;
  choice: number;
}

export interface IGameIssueScore {
  choice: number;
  score: number;
}

export interface IPlayerChoice {
  issue: IIssue;
  playerId: string;
  playerChoice: number;
}

export interface IGameIssue {
  issue: IIssue;
  players: Array<IGamePlayer>;
  score: Array<IGameIssueScore>;
}
