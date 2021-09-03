import { Grid } from '@material-ui/core';
import useStylesChat from '@styles/chat.style';
import { IChatMessages } from './chat';
import { ChatMessage } from './chatMessage';

interface ChatMessagesProps {
  messages: Array<IChatMessages>;
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const classes = useStylesChat();
  
  return (
    <Grid container direction="column" wrap='nowrap' className={classes.chatMessages}>
      {messages &&
        messages.map((message) => (
          <Grid item key={message.id}>
            <ChatMessage message={message} />
          </Grid>
        ))}
    </Grid>
  );
};
