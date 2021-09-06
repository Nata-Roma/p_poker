import { useRouter } from 'next/router';
import Link from 'next/link';
import { FC, useContext, useEffect, useState } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';

import useStylesLobbyPart from '@styles/lobbyPart.style';
import { MemberList } from 'components/Lobby/memberList';
import { UserCard } from 'Cards/userCard';
import NameGame from './nameGame';
import GameSettings from './gameSettings';
import IssueList from './issueList';
import AppContext, { appStore } from 'store/store';
import { IGameSettings, IRoomData, IssueData, IUser } from 'utils/interfaces';
import { ObserverList } from './observerList';
import { initGameSettings, roles } from 'utils/configs';

interface LobbyPartProps {
  users: Array<IUser>;
}

export const LobbyDealer: FC<LobbyPartProps> = ({ users }) => {
  const classes = useStylesLobbyPart();
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { lobby } = router.query;
  const [ dealer, setDealer ] = useState<IUser>();
  const [ userArr, setUserArr ] = useState<Array<IUser>>(users);
  const [ gameSettings, setGameSettings ] = useState<IGameSettings>(
    initGameSettings,
  );

  const onStartGameClick = () => router.push(`/${lobby}/game`);

  const onIssueCreate = (issue: IssueData) => {
    setGameSettings((prev) => {
      const issues = prev.issues;
      issues.push({
        issueName: issue.issueName,
        priority: issue.priority,
      });
      return {
        ...prev,
        issues: issues,
      };
    });
  };

  const onIssueDelete = (issue: string) => {
    setGameSettings((prev) => {
      const issues = prev.issues.filter(
        (issueItem) => issueItem.issueName !== issue,
      );
      return {
        ...prev,
        issues: issues,
      };
    });
  };

  const onTimerChange = (isTimer: boolean) => {
    setGameSettings((prev) => {
      const timer = { ...prev.timer };
      if (isTimer) {
        timer.isTimer = true;
      } else {
        timer.isTimer = false;
        timer.minutes = 0;
        timer.seconds = 0;
      }
      return {
        ...prev,
        timer: timer,
      };
    });
  };

  const onTimeChange = (timerData: string, dimension: string) => {
    setGameSettings((prev) => {
      const timer = { ...prev.timer };
      if (timer.isTimer) {
        timer[dimension] = +timerData;
      }
      return {
        ...prev,
        timer: timer,
      };
    });
  };

  const onRoomLeave = () => {
    state.socket.emit('leaveRoom', {
      roomId: lobby,
      userId: state.userId,
    });
    router.push('/');
  };

  state.socket.on('userJoined', (message) => {
    setUserArr(message);
    console.log('Lobby join user', message);
  });

  state.socket.on('userLeft', (message) => {
    setUserArr(message);
    console.log('Lobby user left', message);
  });

  useEffect(
    () => {
      const dealer = userArr.find((user) => user.dealer);
      setDealer(dealer);
    },
    [ userArr ],
  );

  return (
    <Grid
      container
      direction="column"
      item
      xs={12}
      md={9}
      sm={7}
      className={classes.lobbyPartDealerContainer}
      wrap="nowrap"
    >
      <Grid item>
        <Typography variant="h4" align="center" gutterBottom>
          Lobby
        </Typography>
      </Grid>
      <NameGame />
      <Grid item className={classes.mBottom}>
        <Typography variant="subtitle2">Dealer:</Typography>
        {dealer && (
          <UserCard
            user={dealer}
            observer={dealer.userRole === roles.observer ? true : false}
          />
        )}
      </Grid>
      <Grid
        item
        container
        justifyContent="space-between"
        className={classes.mBottom}
      >
        <Button
          color="primary"
          variant="contained"
          className={classes.btn}
          onClick={onStartGameClick}
        >
          Start Game
        </Button>
        <Button
          variant="outlined"
          className={classes.btn}
          onClick={onRoomLeave}
        >
          Cancel Game
        </Button>
      </Grid>
      <Grid item container>
        {userArr && <MemberList users={userArr} />}
      </Grid>
      <Grid item container>
        {userArr && <ObserverList users={userArr} />}
      </Grid>
      <Grid item container>
        <IssueList
          onIssueCreate={onIssueCreate}
          onIssueDelete={onIssueDelete}
          issues={gameSettings.issues}
        />
        <GameSettings
          onTimerChange={onTimerChange}
          onTimeChange={onTimeChange}
          timer={gameSettings.timer}
        />
      </Grid>
    </Grid>
  );
};
