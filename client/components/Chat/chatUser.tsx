import { Typography } from '@material-ui/core';
import useStylesUserChat from '@styles/userChat.style';
import { IChatMessages, UserData } from './chat';

interface ChatUserProps {
  message: IChatMessages;
}

export const ChatUser = ({ message}: ChatUserProps) => {
  const classes = useStylesUserChat();

  return (
    <div className={classes.container}>
      <div className={classes.avatar}>
        {message.avatar && (
          <div
            className={classes.avatarImg}
            style={{ backgroundImage: `url(${message.avatar})` }}
          />
        )}
        {!message.avatar && <>
          <div className={classes.avatarText}>
              {message.username[0]}
            </div>
            <div className={classes.avatarText}>
              {message.userSurname[0]}
            </div>
        </>
          }
      </div>
      <Typography variant='subtitle2'>{message.username}</Typography>
    </div>
  );
};
