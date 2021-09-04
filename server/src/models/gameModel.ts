import { IGameTask, IUserChoice } from './interfaces';

interface GameInitProps {
  userIds: Array<string>;
  tasks: Array<string>;
}

class Game {
  private id: string;
  private tasks: Array<IGameTask> = [];

  constructor(roomId: string) {
    this.id = roomId;
  }

  gameInit = (props: GameInitProps): void => {
    const users = props.userIds.map((user) => ({ user: user, choice: 0 }));
    props.tasks.forEach((taskName) => {
      const task = {
        taskName,
        users: users,
        score: [],
      };
      this.tasks.push(task);
    });
  };

  getGameId = (): string => {
    return this.id;
  };

  setUserChoice = (userChoice: IUserChoice): void => {
    const taskFound = this.tasks.find(
      (task) => task.taskName === userChoice.taskName,
    );
    if (taskFound) {
      const userFound = taskFound.users.find(
        (user) => user.user === userChoice.userId,
      );
      if (userFound) {
        userFound.choice = userChoice.userChoice;
      }
    }
  };

  getGameTask = (taskName: string): IGameTask | null => {
    const gameTask = this.tasks.find((task) => task.taskName === taskName);
    if (gameTask) {
      const gameTaskCopy = {
        ...gameTask,
        users: [ ...gameTask.users ],
        score: [ ...gameTask.score ],
      };
      return gameTaskCopy;
    }
    return null;
  };
}

export default Game;
