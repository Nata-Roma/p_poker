import { Typography } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import useStylesUserCard from '@styles/userCard.style';
import { IUser } from './Lobby';

interface UserCardProps {
  user: IUser;
}

export const UserCard = ({ user}: UserCardProps) => {
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
        {!user.avatar &&
          user.username.split(' ').map((letter, i) => (
            <div className={classes.avatarText} key={letter + i}>
              {letter[0]}
            </div>
          ))}
      </div>
      <Typography variant='h5'>{user.username}</Typography>
      <BlockIcon fontSize="large" />
    </div>
  );
};
