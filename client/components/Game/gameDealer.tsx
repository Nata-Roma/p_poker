import { useRouter } from 'next/router';
import { FC, useEffect, useState, useContext } from 'react';
import useStylesGame from '@styles/game.style';
import { Typography, Grid, Box, Button } from '@material-ui/core';
import { IGameIssue, IUser } from 'utils/interfaces';

import AppContext from 'store/store';
import { UserCard } from 'Cards/userCard';
import { roles } from 'utils/configs';
import { IssueCards } from './issueCards';
import useStylesGamePart from '@styles/gamePart.style';
import { IssueCard } from './issueCard';

interface GameDealerProps {
  dealer: IUser;
  gameIssues: Array<IGameIssue>;
  onIssueClick: (issueName: string) => void;
  activeIssueName: string;
  calculateIssueScore: () => void
}

export const GameDealer: FC<GameDealerProps> = ({
  dealer,
  gameIssues,
  onIssueClick,
  activeIssueName,
  calculateIssueScore,
}) => {
  const classes = useStylesGamePart();
  const [ issues, setIssues ] = useState<Array<IGameIssue>>();
  const router = useRouter();
  const { lobby } = router.query;
  const { state } = useContext(AppContext);
  const [ title, setTitle ] = useState<string>();

  const createIssue = () => {
    console.log('create issue');
  };

  const onRoomLeave = () => {
    state.socket.emit('leaveRoom', {
      roomId: lobby,
      userId: state.userId,
    });
    router.push('/');
  };

  useEffect(
    () => {
      setIssues(gameIssues);
      const newTitle = gameIssues.map((item) => item.issueName).join(', ');
      setTitle(newTitle);
    },
    [ gameIssues ],
  );
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
        <Grid container item className={classes.mBottom}>
          <div className={classes.issuesContainer}>
            {issues && (
              <IssueCards
                issues={issues}
                activeIssueName={activeIssueName}
                onIssueClick={onIssueClick}
              />
            )}
            <IssueCard
              issueName="Create New Issue"
              priority=""
              addIssue={true}
              onAddIssue={createIssue}
            />
          </div>
          Statistics
        </Grid>
      </Grid>
    </>
  );
};
