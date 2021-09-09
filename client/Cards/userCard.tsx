import { Typography } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import useStylesUserCard from '@styles/userCard.style';
import clsx from 'clsx';
import { FC } from 'react';
import { IUser } from 'utils/interfaces';

export interface UserCardProps {
  user: IUser;
  observer: boolean;
  score?: boolean;
  onKickUser: (user: IUser) => void;
}

export const UserCard:FC<UserCardProps> = ({ user, observer, score, onKickUser }) => {
  const classes = useStylesUserCard();
  const observerRole = clsx(classes.avatar, observer && classes.avatarObserver)

  return (
    <div className={classes.container}>
      <div
        className={observerRole}
      >
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
      <Typography variant="h5">
        {user.username} {user.userSurname}
      </Typography>
      {!user.dealer ? (
        <BlockIcon fontSize={score ? "medium" : "large"} onClick={() => onKickUser(user)} style={{cursor: "pointer"}}/>
      ) : null}
    </div>
  );
};
