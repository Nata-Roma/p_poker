import { getRoomIdsOnly, getRooms, createRoom, joinUser, leaveUser } from './models/rooms';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

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
    console.log('SOCKET JOIN', message);
    joinUser(message.roomId, message.user);

    const rooms = getRoomIdsOnly();
    socket.broadcast.emit('roomList', rooms);
  });
  socket.on('leaveRoom', (message) => {
    console.log('SOCKET LEAVE', message);
    leaveUser(message.roomId, message.userId);

    const rooms = getRoomIdsOnly();
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
  const rooms = getRoomIdsOnly();
  console.log('ROOMS', rooms);
  res.json(rooms);
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
