import { Server } from 'socket.io';
import roomContoller from '../rooms/roomController';

const socketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      methods: [ 'GET', 'POST' ],
      allowedHeaders: [ 'my-custom-header' ],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`Connected to socket: ${socket.id}`);

    socket.on('joinRoom', (message) => {
      socket.join(message.roomId);
      console.log('SOCKET JOIN');
      roomContoller.joinUserToRoom(message.roomId, message.user);
      const rooms = roomContoller.getRoomIds();
      const users = roomContoller.getRoomUsers(message.roomId);
      socket.broadcast.emit('roomList', rooms);
      socket.to(message.roomId).emit('userJoined', users);
    });

    socket.on('sendMessage', (data) => {
      console.log(data);
      const {roomId, userId, message} = data;
      roomContoller.addMessagetoRoomChat(roomId, userId, message);
      const chatMessages = roomContoller.getRoomChat(roomId);
      io.in(roomId).emit('chatMessage', chatMessages);
    });

    socket.on('leaveRoom', (message) => {
      console.log('SOCKET LEAVE', message);
      const {roomId,userId} = message;
      socket.leave(message.roomId);
      roomContoller.leaveUserFromRoom(roomId, userId)
      const users = roomContoller.getRoomUsers(roomId);
      socket.to(roomId).emit('userLeft', users);
    });
  });
};

export default socketServer;
