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

      const user = roomContoller.getRoomUser(roomId, userId);
      socket.emit('reconnectToLobby', user);
    });

    socket.on('sendMessage', (data) => {
      const { roomId, userId, message } = data;

      if (roomId && userId && message) {
        roomContoller.addMessagetoRoomChat(roomId, userId, message);
        const chatMessages = roomContoller.getRoomChat(roomId);
        io.in(roomId).emit('chatMessage', chatMessages);
      }
    });

    socket.on('leaveRoom', (message) => {
      console.log('SOCKET LEAVE', message);
      const { roomId, userId } = message;
      socket.leave(roomId);
      roomContoller.leaveUserFromRoom(roomId, userId);
      const users = roomContoller.getRoomUsers(roomId);
      socket.to(roomId).emit('userLeft', users);
    });

    socket.on('startGame', (message) => {
      socket.to(message.roomId).emit('gameStarted');
    });

    socket.on('gameCardChoice', (message) => {
      const { roomId, playerChoice } = message;
      roomContoller.setGameUserChoice(roomId, playerChoice);
      const checkVotes = roomContoller.getCardTurnStatus(roomId);
      if (checkVotes) {
        const voteFinish = roomContoller.checkVoting(
          roomId,
          playerChoice.issue,
        );
        if (voteFinish) {
          console.log('VOTING FINISHED');
          roomContoller.calculateIssueScore(roomId, playerChoice.issue);
          const gameIssues = roomContoller.getGameIssues(roomId);

          io.in(roomId).emit('activeIssueChanged', {
            issueName: playerChoice.issue,
            gameIssues,
          });
        }
      }
    });

    socket.on('changeActiveIssue', (message) => {
      const { roomId, issueName } = message;
      const gameIssues = roomContoller.getGameIssues(roomId);
      io.in(roomId).emit('activeIssueChanged', { issueName, gameIssues });
    });

    socket.on('calcScore', (message) => {
      const { roomId, issueName } = message;
      roomContoller.calculateIssueScore(roomId, issueName);
      const gameIssues = roomContoller.getGameIssues(roomId);
      io.in(roomId).emit('activeIssueChanged', { issueName, gameIssues });
    });

    socket.on('leaveGame', (message) => {
      const { roomId } = message;
      roomContoller.gameOver(roomId);
      io.in(roomId).emit('gameOver', 'The end');
    });

    socket.on('gameOverFinish', (message) => {
      socket.leave(message.roomId);
    });

    socket.on('kickPlayerFromLobby', (message) => {
      const { roomId, userId } = message;
      socket.to(roomId).emit('userToBeKickedOff', userId);
    });

     socket.on('startTimer', (message) => {
       console.log('TIMER IS STARTED');
      const { roomId, userId } = message;     
      socket.to(roomId).emit('timerStarted', userId);
    });

    // socket.on('userKickOff', (message) => {
    //   const { roomId, userId } = message;
    //   roomContoller.leaveUserFromRoom(roomId, userId);
    //   socket.to(roomId).emit('userToBeKickedOff', userId);
    // });

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
