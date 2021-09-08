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
  cardTurn: boolean;
}

export interface IGamePlayer {
  player: string | IUserData;
  choice: number;
}

export interface IGameIssueScore {
  choice: number;
  ratio: number;
}

export interface IPlayerChoice {
  issue: string;
  playerId: string;
  playerChoice: number;
}

export interface IGameIssue {
  issue: IIssue;
  players: Array<IGamePlayer>;
  score: Array<IGameIssueScore>;
  totalScore: number;
}

export interface IGameSettingsFromClient {
  spring: string;
  issues: Array<IIssue>;
  timer: IGameTimer;
  card: IGameCard;
}
export interface IGameSettings {
  spring: string;
  issues: Array<IGameIssue>;
  timer: IGameTimer;
  card: IGameCard;
}