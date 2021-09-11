import { useRouter } from 'next/router';
import { FC, useEffect, useState, useContext } from 'react';
import { Typography, Grid, Box, Button} from '@material-ui/core';
import { IGamePageIssue, ITimerState, IUser } from 'utils/interfaces';
import AppContext from 'store/store';
import { UserCard } from 'Cards/userCard';
import { roles } from 'utils/configs';
import { IssueCards } from './issueCards';
import useStylesGamePart from '@styles/gamePart.style';
import { IssuesBlock } from './issuesBlock';
import { Timer } from './timer';

interface GameDealerProps {
  dealer: IUser;
  gameIssues: Array<IGamePageIssue>;
  activeIssueName: string;
  timer?: ITimerState;
}

export const GamePlayer: FC<GameDealerProps> = ({
  dealer,
  gameIssues,
  activeIssueName,
  timer
}) => {
  const classes = useStylesGamePart();
  const router = useRouter();
  const { lobby } = router.query;
  const { state } = useContext(AppContext);
  const [ title, setTitle ] = useState<string>();

  const onIssueClick = (issueName: string) => {};

  const onRoomLeave = () => {
    state.socket.emit('leaveRoom', {
      roomId: lobby,
      userId: state.userId,
    });
    router.push('/');
  };

  const gameFinish = (message: string) => {
    console.log('gameOver', message);
    state.socket.emit('gameOverFinish', { roomId: lobby });
    router.push('/');
  };

  useEffect(
    () => {
      const newTitle = gameIssues
        .map((item) => item.issue.issueName)
        .join(', ');
      setTitle(newTitle);
    },
    [ gameIssues ],
  );

  useEffect(() => {
    state.socket.on('gameOver', (message) => {
      gameFinish(message);
    });
    return () => {
      state.socket.off('gameOver', (message) => {
        gameFinish(message);
      });
    };
  }, []);
console.log('dealer', dealer);
  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Spring: planning (issues: {title && `${title}`})
      </Typography>

      <Typography variant="subtitle2">Dealer:</Typography>
      <Grid container direction="column">
        <Grid container justifyContent="space-between" alignItems="flex-end">
          <Grid item className={classes.mBottom}>
            {dealer && (
              <UserCard
                user={dealer}
                observer={dealer.userRole === roles.observer ? true : false}
                onKickUser={() => {}}
              />
            )}
          </Grid>
          <Grid item className={classes.mBottom}>
            <Box boxShadow={2} mr={10}>
              <Button
                variant="outlined"
                className={classes.btn}
                onClick={onRoomLeave}
              >
                Exit
              </Button>
            </Box>
          </Grid>
        </Grid>

       { timer && <Timer timer={timer} dealer={dealer}/> }


        {/* <Grid container item className={classes.mBottom}>
          <div className={classes.issuesContainer}>
            {issues && (
              <IssueCards
                issues={issues}
                activeIssueName={activeIssueName}
                onIssueClick={onIssueClick}
              />
            )}
          </div>
          Statistics
        </Grid> */}
        {gameIssues && (
          <IssuesBlock
            issues={gameIssues}
            activeIssueName={activeIssueName}
            onIssueClick={onIssueClick}
          />
        )}
      </Grid>
    </>
  );
};
