import { UserData } from './rooms';

export interface ChatMessage {
  username: string;
  userSurname: string;
  avatar: string;
  message: string;
}

export interface Chat {
  roomId: string;
  chatMessages: Array<ChatMessage>;
}

const globalChat = [] as Array<Chat>;

export const getChatAllMessages = (roomId: string): Chat | null => {
  const chat = globalChat.find((item) => item.roomId === roomId);
  if (chat) return chat;
  return null;
};

export const addChatMessage = (
  user: UserData,
  message: string,
  roomId: string,
) => {
  const newMessage = {
    username: user.username,
    userSurname: user.userSurname,
    avatar: user.avatar,
    id: user.id,
    message,
  };
  const chat = globalChat.find((item) => item.roomId === roomId);
  if (chat) {
    chat.chatMessages.push(newMessage);
  } else {
    const chatMessages = [] as Array<ChatMessage>;
    chatMessages.push(newMessage);
    globalChat.push({
      roomId,
      chatMessages,
    });
  }
};
