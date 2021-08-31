import { Typography } from '@material-ui/core';
import useStylesUserChat from '@styles/userChat.style';
import { IUser } from 'components/Lobby';

interface ChatUserProps {
  user: IUser;
}

export const ChatUser = ({ user}: ChatUserProps) => {
  const classes = useStylesUserChat();

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
      <Typography variant='subtitle2'>{user.username}</Typography>
    </div>
  );
};
