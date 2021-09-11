import Game from './gameModel';
import {
  IChatMessage,
  IGameSettings,
  IGameIssue,
  IPlayerChoice,
  IUserData,
  IGameSettingsFromClient,
  IIssue,
  IGameTimer,
} from './interfaces';

class Room {
  private users: Array<IUserData> = [];
  private roomId: string;
  private chatMessages: Array<IChatMessage> = [];
  private game: Game;

  constructor(roomId: string) {
    this.roomId = roomId;
    this.game = new Game(this.roomId);
    console.log('new room created');
  }

  getRoomId = (): string | null => {
    if (this.roomId) return this.roomId;
    return null;
  };

  joinUser = (user: IUserData): void => {
    const userFoundIndex = this.findUser(user.id);
    if (userFoundIndex >= 0) {
      const leftPart = this.users.slice(0, userFoundIndex);
      leftPart.push(user);
      const rightPart = this.users.slice(userFoundIndex + 1);
      this.users = leftPart.concat(rightPart);
    } else {
      this.users.push(user);
    }
  };

  leaveUser = (userId: string): void => {
    this.users = this.users.filter((item) => item.id !== userId);
  };

  getUser = (userId: string): IUserData => {
    const userIndex = this.findUser(userId);
    if (userIndex >= 0) {
      return this.users[userIndex];
    }
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
    console.log('incoming userId', userId);

    const userFoundIndex = this.users.findIndex((user) => user.id === userId);
    console.log('found user', userFoundIndex);
    console.log('all users', this.users);

    if (userFoundIndex >= 0) return userFoundIndex;
    return -1;
  };

  getGameId = () => {
    return this.game.getGameId();
  };

  setUserChoice = (userChoice: IPlayerChoice) => {
    this.game.setPlayerChoice(userChoice);
  };

  getGameIssue = (issueName: string): IGameIssue => {
    const issue = this.game.getGameIssue(issueName);
    const users = issue.players.map((task) => {
      const userFound = this.users.find((us) => us.id === task.player);
      if (userFound) {
        const newUser = {
          player: userFound,
          choice: task.choice,
        };
        return newUser;
      }
      return null;
    });
    issue.players = users;

    return issue;
  };

  gameInit = (client: IGameSettingsFromClient) => {
    const players = this.users.map((user) => {
      if (user.userRole === 'member') {
        return user.id;
      }
    });
    this.game.gameInit({ playerIds: players, client });
  };

  getGameInitData = (): IGameSettings => {
    return this.game.getGameInitData();
  };

  calculateIssueScore = (issueName: string) => {
    this.game.calculateIssueScore(issueName);
  };

  getGameIssues = (): Array<IGameIssue> => {
    return this.game.getGameIssues();
  };

  getCardTurnStatus = (): boolean => {
    return this.game.getCardTurnStatus();
  };

  checkVoting = (issueName: string): Array<IGameIssue> | null => {
    return this.game.checkVoting(issueName);
  };

  addNewIssue = (issue: IIssue): void => {
    const playerIds = this.users.map((user) => {
      if (user.userRole === 'member') {
        return user.id;
      }
    });
    this.game.addNewIssue(issue, playerIds);
  };

  getTimer = (): IGameTimer => {
    const timer = this.game.getTimer();
    if (timer) return timer;
  };
}

export default Room;
