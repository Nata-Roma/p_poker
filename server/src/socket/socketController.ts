import { Server } from 'socket.io';
import {
  socketRoomIssueInward,
  socketRoomNewIssueInward,
  socketRoomPlayerChoiceInward,
  socketRoomUserIdInward,
  socketRoomUserIdmessageInward,
  socketRoomUserInward,
} from '../models/interfaces';
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

    socket.on('joinRoom', (message: socketRoomUserInward) => {
      const { roomId, user } = message;
      const room = roomContoller.getRoomId(roomId);
      if (room) {
        socket.join(message.roomId);
        console.log('SOCKET JOIN');
        if (user.id) {
          roomContoller.joinUserToRoom(roomId, user);
          const rooms = roomContoller.getRoomIds();
          const users = roomContoller.getRoomUsers(roomId);
          socket.broadcast.emit('roomList', rooms);
          io.in(roomId).emit('userJoined', users);
        }
      }
    });

    socket.on('userRoomReconnect', (message: socketRoomUserIdInward) => {
      const { roomId, userId } = message;
      const room = roomContoller.getRoomId(roomId);
      if (room) {
        console.log('Socket REconnected', roomId, userId);

        const user = roomContoller.getRoomUser(roomId, userId);
        socket.emit('reconnectToLobby', user);
      }
    });

    socket.on('sendMessage', (data: socketRoomUserIdmessageInward) => {
      const { roomId, userId, message } = data;

      if (roomId && userId && message) {
        roomContoller.addMessagetoRoomChat(roomId, userId, message);
        const chatMessages = roomContoller.getRoomChat(roomId);
        io.in(roomId).emit('chatMessage', chatMessages);
      }
    });

    socket.on('leaveRoom', (message: socketRoomUserIdInward) => {
      const { roomId, userId } = message;
      const room = roomContoller.getRoomId(roomId);
      if (room) {
        console.log('SOCKET LEAVE', message);

        let users = roomContoller.getRoomUsers(roomId);
        const userDealer = users.find((user) => user.id === userId);
        console.log('users before leave', users);
        if (userDealer.dealer) {
          console.log('DEALER');
          roomContoller.gameOver(roomId);
          io.in(roomId).emit('gameOver', 'The end');
        } else {
          roomContoller.leaveUserFromRoom(roomId, userId);
          users = roomContoller.getRoomUsers(roomId);
          socket.to(roomId).emit('userLeft', users);
        }
        socket.leave(roomId);
      }
    });

    socket.on('startGame', (message: { roomId: string }) => {
      socket.to(message.roomId).emit('gameStarted');
    });

    socket.on('gameCardChoice', (message: socketRoomPlayerChoiceInward) => {
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

    socket.on('changeActiveIssue', (message: socketRoomIssueInward) => {
      const { roomId, issueName } = message;
      const gameIssues = roomContoller.getGameIssues(roomId);
      const timer = roomContoller.getTimer(roomId);
      io.in(roomId).emit('activeIssueChanged', {
        issueName,
        gameIssues,
        timer,
      });
    });

    socket.on('calcScore', (message: socketRoomIssueInward) => {
      const { roomId, issueName } = message;
      roomContoller.calculateIssueScore(roomId, issueName);
      const gameIssues = roomContoller.getGameIssues(roomId);
      const timer = roomContoller.getTimer(roomId);
      io.in(roomId).emit('activeIssueChanged', {
        issueName,
        gameIssues,
        timer: { isTimer: timer.isTimer, time: 0 },
      });
    });

    socket.on('leaveGame', (message: { roomId: string }) => {
      const { roomId } = message;
      roomContoller.gameOver(roomId);
      io.in(roomId).emit('gameOver', 'The end');
    });

    socket.on('gameOverFinish', (message: { roomId: string }) => {
      socket.leave(message.roomId);
    });

    socket.on('kickPlayerFromLobby', (message: socketRoomUserIdInward) => {
      const { roomId, userId } = message;
      console.log('kickPlayerFromLobby', userId);

      socket.to(roomId).emit('userToBeKickedOff', userId);
    });

    socket.on('startVoting', (message: { roomId: string }) => {
      console.log('TIMER IS STARTED');
      const { roomId } = message;
      const timer = roomContoller.getTimer(roomId);
      if (timer) {
        io
          .in(roomId)
          .emit('timerStarted', { time: Date.now(), timer, voting: true });
      }
    });

    socket.on('addNewGameIssue', (message: socketRoomNewIssueInward) => {
      const { roomId, newIssue } = message;
      roomContoller.addNewIssue(roomId, newIssue);
      const issues = roomContoller.getGameIssues(roomId);
      io.in(roomId).emit('newGameIssue', issues);
    });

    socket.on('amendScoreGameIssue', (message) => {
      const { roomId, amnendedIssue } = message;
      roomContoller.amendedIssueScore(roomId, amnendedIssue);
      const issues = roomContoller.getGameIssues(roomId);
      io.in(roomId).emit('newGameIssue', issues);
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
