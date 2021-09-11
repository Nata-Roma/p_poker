import {
  IGameCard,
  IGameSettings,
  IGameIssue,
  IGameTimer,
  IPlayerChoice,
  IGameSettingsFromClient,
  IGamePlayer,
  IIssue,
} from './interfaces';

export const nonVoted = 999;

interface GameInitProps {
  playerIds: Array<string>;
  client: IGameSettingsFromClient;
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
    props.client.issues.forEach((issue) => {
      const players = [] as Array<IGamePlayer>;
      props.playerIds.forEach((player) => {
        if (player) {
          const newPlayer = {
            player: player,
            choice: 0,
          };
          players.push(newPlayer);
        }
      });
      if (players.length) {
        const newIssue = {
          issue: { ...issue },
          players: players,
          score: [],
          totalScore: 0,
        };
        this.issues.push(newIssue);
      }
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
      issues: this.issues,
    };
    return gameData;
  };

  setPlayerChoice = (playerChoice: IPlayerChoice): void => {
    const issueFound = this.issues.find(
      (issue) => issue.issue.issueName === playerChoice.issue,
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

  calculateIssueScore = (issueName: string): void => {
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

      const score = issueScore.map((item) => {
        const ratio = (item.playerQuantity / item.totalPlayers * 100).toFixed(
          2,
        );
        return {
          choice: item.choice,
          ratio: +ratio,
        };
      });
      gameIssue.score = score;
      const totalScore = score.reduce((acc, item) => {
        if (item.choice !== nonVoted) {
          return acc + item.choice * item.ratio;
        }
        return acc;
      }, 0);
      gameIssue.totalScore = +(totalScore / 100).toFixed(2);
    }
  };

  setIssueScore = (issueName: string): void => {
    const gameIssue = this.issues.find(
      (issue) => issue.issue.issueName === issueName,
    );
    if (gameIssue) {
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

  getGameIssues = (): Array<IGameIssue> => {
    return this.issues;
  };

  checkVoting = (issueName: string): Array<IGameIssue> | null => {
    const gameIssue = this.issues.find(
      (issue) => issue.issue.issueName === issueName,
    );

    if (gameIssue) {
      const unvoted = gameIssue.players.filter((player) => !player.choice);
      if (!unvoted.length) return this.issues;
      return null;
    }
  };

  getCardTurnStatus = (): boolean => {
    return this.card.cardTurn;
  };

  addNewIssue = (issue: IIssue, playerIds: Array<string>): void => {
    const players = [] as Array<IGamePlayer>;
    playerIds.forEach((player) => {
      if (player) {
        const newPlayer = {
          player: player,
          choice: 0,
        };
        players.push(newPlayer);
      }
    });
    if (players.length) {
      const newIssue = {
        issue: issue,
        players: players,
        score: [],
        totalScore: 0,
      };
      this.issues.push(newIssue);
    }
  };

  getTimer = (): IGameTimer => {
    return this.timer;
  };
}

export default Game;
