import { Grid, Typography } from '@material-ui/core';
import useStylesScoreList from '@styles/scoreList.style';
import React, { FC } from 'react';
import { roles } from 'utils/configs';
import { IUser } from 'utils/interfaces';
import { UserGameCard } from './userGameCard';
import { ScoreCard } from './scoreCard';

interface ScoreListProps {
  users: Array<IUser>;
}

export const ScoreList: FC<ScoreListProps> = ({ users }) => {
  const classes = useStylesScoreList();

  return (
    <div className={classes.container}>
      <Grid
        container
        item
        spacing={2}
        justifyContent="space-around"
        className={classes.heading}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Scores:
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Members:
        </Typography>
      </Grid>
      {users &&
        users.map(
          (user) =>
            !user.dealer &&
            user.userRole === roles.member && (
              <Grid
                container
                item
                justifyContent="space-evenly"
                alignItems="center"
                key={user.id}
              >
                <Grid item xl={6} xs={6} container justifyContent="center">
                  <ScoreCard user={user} />
                </Grid>
                <Grid
                  item
                  xl={6}
                  xs={6}
                  key={user.id}
                  container
                  justifyContent="center"
                >
                  <UserGameCard user={user} observer={false} score={true} />
                </Grid>
              </Grid>
            ),
        )}
    </div>
  );
};
