import { Typography } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import useStylesUserCard from '@styles/userCard.style';
import { FC } from 'react';
import { UserCardProps } from 'utils/interfaces';

export const UserCard:FC<UserCardProps> = ({ user, observer, score, onRemoveUser }) => {
  const classes = useStylesUserCard();

  const onKickUser = () => {
    onRemoveUser(user);
  };

  return (
    <div className={classes.container}>
      <div
        className={
          observer
            ? `${classes.avatar} ${classes.avatarObserver}`
            : classes.avatar
        }
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
        <BlockIcon fontSize={score ? "medium" : "large"} onClick={onKickUser} style={{cursor: "pointer"}}/>
      ) : null}
    </div>
  );
};
