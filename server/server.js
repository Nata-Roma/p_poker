import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { router } from './routes/users.js';

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

const routes = {
  users: '/users',
}

app.use(express.json());

io.on('connection', (socket) => {
  console.log(`Connected to socket: ${socket.id}`);
});

app.use(routes.users, router);

app.get('/', (req, res) => {
  res.send(`<h1>Hello from server</h1>`);
});

app.post('/', (req, res) => {
  const data = req.body.data;

  res.status(201).json(data);
});

app.get('/rooms', (req, res) => {
  // if(roomsData.size) {
  //   console.log(roomsData);
  //   const rooms = JSON.stringify(roomsData);
  //   console.log(rooms);
  //   res.send({data: rooms})
  // } else {
  //   res.json({data: 'no data'})
  // }

  console.log('Raw roomData', roomsData);
  const rooms = Array.from(roomsData, ([name, value]) => ({ name, value }));
  
  console.log('rooms', rooms);
  res.send(JSON.stringify(rooms))
})

app.post('/rooms', (req, res) => {
  console.log(req.body.data);
  users.set(req.body.data.user.id, req.body.data.user);
  roomsData.set(req.body.data.room, req.body.data.room);
  const data = {
    users: users.get(req.body.data.user.id),
    roomsData: roomsData.get(req.body.data.room),
  }
  res.status(201).json(data);
});

// app.post('/users', (req, res) => {
//   console.log(req.body);
//   res.status(201).json(req.body);
// })

httpServer.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
})
