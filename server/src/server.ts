import { getRoomIdsOnly, getRooms, setRoom } from './models/rooms';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
app.use(cors());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});
const PORT = 4000;

const roomsData = new Map();
const users = new Map();

app.use(express.json());

io.on('connection', (socket) => {
  console.log(`Connected to socket: ${socket.id}`);
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
  res.json(rooms)
})

app.post('/rooms', (req, res) => {
  const {room, user} = req.body.data
  console.log(req.body.data);
  users.set(user.id, user);
  roomsData.set(room, room);
  const data = {
    users: users.get(user.id),
    roomsData: roomsData.get(room),
  }
  setRoom(room, user);
  res.status(201).json(data);
});

// app.post('/users', (req, res) => {
//   console.log(req.body);
//   res.status(201).json(req.body);
// })

httpServer.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
})
