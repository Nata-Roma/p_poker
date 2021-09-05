import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import socketServer from './socket/socketController';
import roomContoller from './roomServices/roomController';

const app = express();
const httpServer = createServer(app);
app.use(cors());

socketServer(httpServer);
const PORT = 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<h1>Hello from server</h1>`);
});

app.post('/', (req, res) => {
  const data = req.body.data;

  res.status(201).json(data);
});

app.get('/rooms', (req, res) => {
  const rooms = roomContoller.getRoomIds();
  console.log('ROOMS', rooms);
  res.json(rooms);
});

app.get('/chats/:room', (req, res) => {
  const room = req.params.room;
  console.log('ROOM request for chat', room);
  if (room) {
    const chat = roomContoller.getRoomChat(room);
    res.json(chat);
  }
  res.json(null);
});

app.get('/users/:room', (req, res) => {
  const room = req.params.room;
  if (room) {
    const users = roomContoller.getRoomUsers(room);
    res.json(users);
  }
  res.json(null);
});

app.post('/rooms', (req, res) => {
  const { data } = req.body;
  roomContoller.createRoom(data);
  res.status(201).json('created');
});

app.get('/game/:room', (req, res) => {
  const room = req.params.room;
  const gameId = roomContoller.getGameId(room);
  console.log('Incoming Id', room);
  console.log('GAME id', gameId);
});

// app.post('/users', (req, res) => {
//   console.log(req.body);
//   res.status(201).json(req.body);
// })

httpServer.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
