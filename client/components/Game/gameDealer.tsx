import { useRouter } from 'next/router';
import { FC, useEffect, useState, useContext } from 'react';
import { Typography, Grid, Box, Button } from '@material-ui/core';
import { IGamePageIssue, IUser } from 'utils/interfaces';

import AppContext from 'store/store';
import { UserCard } from 'Cards/userCard';
import { roles } from 'utils/configs';
import useStylesGamePart from '@styles/gamePart.style';
import { IssuesBlock } from './issuesBlock';

interface GameDealerProps {
  dealer: IUser;
  gameIssues: Array<IGamePageIssue>;
  onIssueClick: (issueName: string) => void;
  activeIssueName: string;
  calculateIssueScore: () => void;
  springTitle: string;
}

export const GameDealer: FC<GameDealerProps> = ({
  dealer,
  gameIssues,
  onIssueClick,
  activeIssueName,
  calculateIssueScore,
  springTitle,
}) => {
  const classes = useStylesGamePart();
  const router = useRouter();
  const { lobby } = router.query;
  const { state } = useContext(AppContext);
  const [ title, setTitle ] = useState<string>();

  const onRoomLeave = () => {
    state.socket.emit('leaveRoom', {
      roomId: lobby,
      userId: state.userId,
    });
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

  // useEffect(() => {
  //   state.socket.on('gameOver', (message => {
  //     console.log('gameOver');
  //   }))
  //   return () => {
  //     state.socket.off('gameOver', (message => {
  //       console.log('gameOver');
  //     }))
  //   }
  // })

  return (
    <div>
      <Typography variant="h6" align="center" gutterBottom>
        Spring: {springTitle && `${springTitle}`} planning (issues:{' '}
        {title && `${title}`})
      </Typography>

      <Typography variant="subtitle2">Dealer:</Typography>
      <Grid container direction="column">
        <Grid container justifyContent="space-between" alignItems="flex-end">
          <Grid item className={classes.mBottom}>
            {dealer && (
              <UserCard
                user={dealer}
                observer={dealer.userRole === roles.observer ? true : false}
              />
            )}
          </Grid>
          <Grid item className={classes.mBottom}>
            <Box boxShadow={2} mr={10}>
              <Button
                variant="outlined"
                className={classes.btn}
                onClick={calculateIssueScore}
              >
                Issue Score
              </Button>
            </Box>
          </Grid>
          <Grid item className={classes.mBottom}>
            <Box boxShadow={2} mr={10}>
              <Button
                variant="outlined"
                className={classes.btn}
                onClick={onRoomLeave}
              >
                Stop Game
              </Button>
            </Box>
          </Grid>
        </Grid>
        {gameIssues && (
          <IssuesBlock
            issues={gameIssues}
            activeIssueName={activeIssueName}
            onIssueClick={onIssueClick}
          />
        )}
      </Grid>
    </div>
  );
};
