import { Typography } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import useStylesUserCard from '@styles/userCard.style';
import { IUser } from 'utils/interfaces';

interface UserCardProps {
  user: IUser;
}

export const UserCard = ({ user }: UserCardProps) => {
  const classes = useStylesUserCard();

  return (
    <div className={classes.container}>
      <div className={classes.avatar}>
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
      <Typography variant="h5">{user.username}{' '}{user.userSurname}</Typography>
      <BlockIcon fontSize="large" />
    </div>
  );
};
