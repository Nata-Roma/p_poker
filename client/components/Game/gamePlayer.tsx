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

interface GameDealerProps {
  dealer: IUser;
  gameIssues: Array<IGameIssue>;
}

export const GamePlayer: FC<GameDealerProps> = ({ dealer, gameIssues }) => {
  const classes = useStylesGamePart();
  const [ issues, setIssues ] = useState<Array<IGameIssue>>();
  const router = useRouter();
  const { lobby } = router.query;
  const { state } = useContext(AppContext);
  const [ activeIssueName, setActiveIssueName ] = useState<string>();
  const [ title, setTitle ] = useState<string>();

  const onIssueClick = (issueName: string) => {};

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
      setActiveIssueName(gameIssues[0].issueName);
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
                onClick={onRoomLeave}
              >
                Exit
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
          </div>
          Statistics
        </Grid>
      </Grid>
    </>
  );
};
