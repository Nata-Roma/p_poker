import { Typography } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import useStylesUserGameCard from '@styles/userGameCard.style';
import clsx from 'clsx';
import { FC } from 'react';
import { IUser } from 'utils/interfaces';

interface UserGameCardProps {
  user: IUser;
  observer: boolean;
  score?: boolean;
}

export const UserGameCard: FC<UserGameCardProps> = ({ user, observer, score }) => {
  const classes = useStylesUserGameCard();
  const observerView = clsx(classes.avatar, observer && classes.avatarObserver);
  const dealerRole = clsx(classes.container, user.dealer && classes.containerDealer);

  return (
    <div className={classes.container}>
      <div className={observerView}>
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
      <Typography variant="body1">{user.username}{' '}{user.userSurname}</Typography>
      {/* <BlockIcon fontSize={score ? "medium" : "large"} /> */}
      </div>
    </div>
  );
};
