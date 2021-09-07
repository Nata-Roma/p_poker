import {
  IGameCard,
  IGameSettings,
  IGameIssue,
  IGameTimer,
  IPlayerChoice,
} from './interfaces';

interface GameInitProps {
  playerIds: Array<string>;
  client: IGameSettings;
}

class Game {
  private id: string;
  private issues: Array<IGameIssue> = [];
  private card: IGameCard = null;
  private timer: IGameTimer = null;

  constructor(roomId: string) {
    this.id = roomId;
  }

  gameInit = (props: GameInitProps): void => {
    const players = props.playerIds.map((player) => ({
      player: player,
      choice: 0,
    }));
    props.client.issues.forEach((issue) => {
      const newIssue = {
        issue: { ...issue },
        players: { ...players },
        score: [],
      };
      this.issues.push(newIssue);
    });
    this.card = { ...props.client.card };
    this.timer = { ...props.client.timer };
    console.log('INIT GAME');
    console.log(this.issues);
    console.log(this.card);
    console.log(this.timer);
  };

  getGameId = (): string => {
    return this.id;
  };

  getGameInitData = (): IGameSettings => {
    const gameData = {
      timer: { ...this.timer },
      card: { ...this.card },
      issues: this.issues.map((issue) => issue.issue),
    };
    return gameData;
  };

  setPlayerChoice = (playerChoice: IPlayerChoice): void => {
    const issueFound = this.issues.find(
      (issue) => issue.issue === playerChoice.issue,
    );
    if (issueFound) {
      const playerFound = issueFound.players.find(
        (player) => player.player === playerChoice.playerId,
      );
      if (playerFound) {
        playerFound.choice = playerChoice.playerChoice;
      }
    }
  };

  getGameIssue = (issueName: string): IGameIssue | null => {
    const gameIssue = this.issues.find(
      (issue) => issue.issue.issueName === issueName,
    );
    if (gameIssue) {
      const gameTaskCopy = {
        ...gameIssue,
        players: [ ...gameIssue.players ],
        score: [ ...gameIssue.score ],
      };
      return gameTaskCopy;
    }
    return null;
  };
}

export default Game;
