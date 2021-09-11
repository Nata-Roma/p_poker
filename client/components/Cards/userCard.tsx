import { Typography } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import useStylesUserCard from '@styles/userCard.style';
import clsx from 'clsx';
import { FC } from 'react';
import { UserCardProps } from 'utils/interfaces';

export const UserCard:FC<UserCardProps> = ({ user, observer, score, onKickUser }) => {
  const classes = useStylesUserCard();
  const observerRole = clsx(classes.avatar, observer && classes.avatarObserver);
  const dealerRole = clsx(classes.container, user.dealer && classes.containerDealer);

  return (
    <div className={dealerRole}>
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
      <div className={user.dealer && classes.dealerName}>
      <Typography variant="h5" className=''>
        {user.username} {user.userSurname}
      </Typography>
      </div>
      {!user.dealer ? (
        <BlockIcon fontSize={score ? "medium" : "large"} onClick={() => onKickUser(user)} style={{cursor: "pointer"}}/>
      ) : null}
    </div>
  );
};
