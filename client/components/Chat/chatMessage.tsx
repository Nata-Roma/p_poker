import { Grid, Typography } from '@material-ui/core';
import { IChatMessages, IChatUser } from './chat';
import { ChatUser } from './chatUser';

interface ChatMessageProps {
  message: IChatMessages;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <Grid item key={message.id}>
      <ChatUser message={message} />
      <Typography>{message.message}</Typography>
    </Grid>
  );
};
