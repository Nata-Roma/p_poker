import { Grid, Typography } from '@material-ui/core';
import { IChatUser } from './chat';
import { ChatUser } from './chatUser';

interface ChatMessageProps {
  message: IChatUser;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <Grid item key={message.username + message.username}>
      <ChatUser user={{ username: message.username, avatar: message.avatar }} />
      <Typography>{message.message}</Typography>
    </Grid>
  );
};
