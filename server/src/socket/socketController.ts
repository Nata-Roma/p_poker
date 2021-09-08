import { Server } from 'socket.io';
import roomContoller from '../roomServices/roomController';

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
    console.log('Socket userId', socket.handshake.auth.userId);

    socket.on('joinRoom', (message) => {
      socket.join(message.roomId);
      console.log('SOCKET JOIN');
      const { roomId, user } = message;
      if (user.id) {
        roomContoller.joinUserToRoom(roomId, user);
        const rooms = roomContoller.getRoomIds();
        const users = roomContoller.getRoomUsers(roomId);
        socket.broadcast.emit('roomList', rooms);
        io.in(roomId).emit('userJoined', users);
      }
    });

    socket.on('userRoomReconnect', (message) => {
      const { roomId, userId } = message;
      console.log('Socket REconnected', roomId, userId);

      // socket.join(roomId);
      // roomContoller.joinUserToRoom(roomId, userId);
      const user = roomContoller.getRoomUser(roomId, userId);
      socket.emit('reconnectToLobby', user);
    });

    socket.on('sendMessage', (data) => {
      console.log(data);
      const { roomId, userId, message } = data;
      console.log(roomId, userId, message);

      if (roomId && userId && message) {
        roomContoller.addMessagetoRoomChat(roomId, userId, message);
        const chatMessages = roomContoller.getRoomChat(roomId);
        io.in(roomId).emit('chatMessage', chatMessages);
      }
    });

    socket.on('leaveRoom', (message) => {
      console.log('SOCKET LEAVE', message);
      const { roomId, userId } = message;
      socket.leave(message.roomId);
      roomContoller.leaveUserFromRoom(roomId, userId);
      const users = roomContoller.getRoomUsers(roomId);
      socket.to(roomId).emit('userLeft', users);
    });

    socket.on('startGame', (message) => {
      socket.to(message.roomId).emit('gameStarted');
    });

    socket.on('gameCardChoice', (message) => {
      const { roomId, player, choice } = message;
      console.log(choice);
      

    });

    // socket.on('disconnect', (message) => {
    //   console.log('Got disconnect!');
    //   roomContoller.userDisconnect(socket.handshake.auth.username);
    //   socket.emit('userDisconnected')
    //   // const { roomId, userId } = message;
    //   // socket.leave(roomId);
    //   // const users = roomContoller.getRoomUsers(roomId);
    //   // socket.to(roomId).emit('userLeft', users);
    //   console.log(socket.handshake.auth.username);

    //  });
  });
};

export default socketServer;
