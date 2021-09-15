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
    // console.log('ALL rooms', io.sockets.adapter.rooms);

    socket.on('joinRoom', (message) => {
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

    socket.on('userRoomReconnect', (message) => {
      const { roomId, userId } = message;
      const room = roomContoller.getRoomId(roomId);
      if (room) {
        console.log('Socket REconnected', roomId, userId);

        const user = roomContoller.getRoomUser(roomId, userId);
        socket.emit('reconnectToLobby', user);
      }
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
      const { roomId, userId } = message;
      const room = roomContoller.getRoomId(roomId);
      if (room) {
        console.log('SOCKET LEAVE', message);
        socket.leave(roomId);
        roomContoller.leaveUserFromRoom(roomId, userId);
        const users = roomContoller.getRoomUsers(roomId);
        socket.to(roomId).emit('userLeft', users);
      }
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
      const timer = roomContoller.getTimer(roomId);
      io.in(roomId).emit('activeIssueChanged', {
        issueName,
        gameIssues,
        timer,
      });
    });

    socket.on('calcScore', (message) => {
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

    socket.on('startVoting', (message) => {
      console.log('TIMER IS STARTED');
      const { roomId } = message;
      const timer = roomContoller.getTimer(roomId);
      if (timer) {
        io
          .in(roomId)
          .emit('timerStarted', { time: Date.now(), timer, voting: true });
      }
    });

    socket.on('addNewGameIssue', (message) => {
      const { roomId, newIssue } = message;
      roomContoller.addNewIssue(roomId, newIssue);
      const issues = roomContoller.getGameIssues(roomId);
      io.in(roomId).emit('newGameIssue', issues);
    });

    socket.on('getGameData', (message) => {
      console.log('getGameData', message);
      const { roomId, user } = message;
      const newPlayer = {
        player: user.id,
        choice: 0,
      };
      const gameInitData = roomContoller.getGameInitData(roomId);
      const issues = roomContoller.getGameIssues(roomId);
      Object.values(issues).map(issue => issue.players = [...issue.players, newPlayer])
      // console.log('issues from socket updated game data', issues);
      const gameData = { ...gameInitData, issues: issues};
      console.log('game data updated from socket', gameData);
      if(gameData && gameData.isStarted && !gameData.isAutoJoin) {
        console.log('late mem - game in process and ask to join', user);
        socket.to(roomId).emit('lateMemberAskToJoin', user);
      }
      io.in(message.roomId).emit('gameData', { gameData: gameData, lateMember: user });
    });

    socket.on('allowLateMemberIntoGame', (message) => {
      const { roomId, userId } = message;     
      socket.to(roomId).emit('lateMemberMayJoin', userId);
    });

    socket.on('checkTimer', (message) => {
      const { roomId } = message;
      socket.to(roomId).emit('sendTimerTime');
    });

    socket.on('dealerTimeStarted', (message) => {
      const { roomId, timeStarted } = message;
      socket.to(roomId).emit('currentDealerTimeStarted', timeStarted);
    });

    socket.on('declineLateMember', (message) => {
      console.log('from SOCKET - declined', message);
      const { roomId, userId } = message;
      const room = roomContoller.getRoomId(roomId);
      if (room) {
        socket.to(roomId).emit('memberIsDeclined', userId);
      }
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
