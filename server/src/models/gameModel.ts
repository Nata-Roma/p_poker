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
  private spring: string = '';
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
        players: [ ...players ],
        score: [],
      };
      this.issues.push(newIssue);
    });
    this.spring = props.client.spring;
    this.card = { ...props.client.card };
    this.timer = { ...props.client.timer };
  };

  getGameId = (): string => {
    return this.id;
  };

  getGameInitData = (): IGameSettings => {
    const gameData = {
      spring: this.spring,
      timer: { ...this.timer },
      card: { ...this.card },
      issues: this.issues.map((issue) => issue.issue),
    };
    return gameData;
  };

  setPlayerChoice = (playerChoice: IPlayerChoice): void => {
    console.log('Set CHOICE', playerChoice);
    
    const issueFound = this.issues.find(
      (issue) => issue.issue.issueName === playerChoice.issue,
    );
    console.log('ISSUE FOUND', issueFound);
    
    if (issueFound) {
      const playerFound = issueFound.players.find(
        (player) => player.player === playerChoice.playerId,
      );
      console.log('PLAYER FOUND', playerFound);
      
      if (playerFound) {
        playerFound.choice = playerChoice.playerChoice;
      }
    }
    console.log('all ussues', this.issues);
    
  };

  calculateIssueScore = (issueName: string): IGameIssue | null => {
    const gameIssue = this.issues.find(
      (issue) => issue.issue.issueName === issueName,
    );
    if (gameIssue) {
      const issueScore = gameIssue.players.reduce((arr, player) => {
        const choiceFound = arr.find((item) => item.choice === player.choice);
        if (choiceFound) {
          choiceFound.playerQuantity += 1;
        } else {
          const newScore = {
            choice: player.choice,
            playerQuantity: 1,
            totalPlayers: gameIssue.players.length,
          };
          arr.push(newScore);
        }
        return arr;
      }, []);
      gameIssue.score = issueScore;
    }
    if (gameIssue.score.length) return gameIssue;
    return null;
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
