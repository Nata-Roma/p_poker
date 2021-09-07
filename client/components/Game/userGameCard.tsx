import { Typography } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import useStylesUserGameCard from '@styles/userGameCard.style';
import { FC } from 'react';
import { IUser } from 'utils/interfaces';

interface UserGameCardProps {
  user: IUser;
  observer: boolean;
  score?: boolean;
}

export const UserGameCard: FC<UserGameCardProps> = ({ user, observer, score }) => {
  const classes = useStylesUserGameCard();

  return (
    <div className={classes.container}>
      <div className={observer ? `${classes.avatar} ${classes.avatarObserver}` : classes.avatar}>
        {user.avatar && (
          <div
            className={classes.avatarImg}
            style={{ backgroundImage: `url(${user.avatar})` }}
          />
        )}
        {!user.avatar && (
          <>
            <div className={classes.avatarText}>{user.username[0]}</div>
            <div className={classes.avatarText}>{user.userSurname[0]}</div>
          </>
        )}
      </div>
      <Typography variant="body1">{user.username}{' '}{user.userSurname}</Typography>
      <BlockIcon fontSize={score ? "medium" : "large"} />
    </div>
  );
};