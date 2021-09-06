import { Typography } from '@material-ui/core';
import useStylesScoreCard from '@styles/scoreCard.style';
import React, { useState } from 'react';
import { IUser } from 'utils/interfaces';

interface UserCardProps {
  user: IUser;
}

export const ScoreCard = ({ user }: UserCardProps) => {
  const classes = useStylesScoreCard();
  const [ score, setScore ] = useState('10 SP');
  return (
    <div className={classes.container}>
      <Typography variant="h5">{score}</Typography>
    </div>
  );
};
