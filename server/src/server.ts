import {
  getRoomIds,
  getRooms,
  createRoom,
  joinUser,
  leaveUser,
  getUser,
  getRoom,
} from './models/rooms';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { addChatMessage, getChatAllMessages } from './models/chat';

const app = express();
const httpServer = createServer(app);
app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: [ 'GET', 'POST' ],
    allowedHeaders: [ 'my-custom-header' ],
    credentials: true,
  },
});
const PORT = 4000;

app.use(express.json());

io.on('connection', (socket) => {
  console.log(`Connected to socket: ${socket.id}`);

  socket.on('joinRoom', (message) => {
    socket.join(message.roomId);
    console.log('SOCKET JOIN');
    joinUser(message.roomId, message.user);

    const rooms = getRoomIds();
    const users = getRoom(message.roomId);
    socket.broadcast.emit('roomList', rooms);
    socket.to(message.roomId).emit('userJoined', users);
  });

  socket.on('sendMessage', (message) => {
    console.log(message);
    const user = getUser(message.roomId, message.userId);
    addChatMessage(user, message.message, message.roomId);
    const chatMessages = getChatAllMessages(message.roomId);
    io.in(message.roomId).emit('chatMessage', chatMessages.chatMessages);
  });

  socket.on('leaveRoom', (message) => {
    console.log('SOCKET LEAVE', message);
    socket.leave(message.roomId);
    leaveUser(message.roomId, message.userId);

    const rooms = getRoomIds();
    socket.broadcast.emit('roomList', rooms);
  });
});

app.get('/', (req, res) => {
  res.send(`<h1>Hello from server</h1>`);
});

app.post('/', (req, res) => {
  const data = req.body.data;

  res.status(201).json(data);
});

app.get('/rooms', (req, res) => {
  const rooms = getRoomIds();
  console.log('ROOMS', rooms);
  res.json(rooms);
});

app.get('/chats/:room', (req, res) => {
  const room = req.params.room;
  const chat = getChatAllMessages(room);
  console.log('request for chat', room);
  res.json(chat);
});

app.get('/users/:room', (req, res) => {
  const room = req.params.room;
  const users = getRoom(room);
  console.log('request for users', room);
  res.json(users);
});

app.post('/rooms', (req, res) => {
  const { data } = req.body;
  createRoom(data);
  res.status(201).json('created');
});

// app.post('/users', (req, res) => {
//   console.log(req.body);
//   res.status(201).json(req.body);
// })

httpServer.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
