const express = require('express');
const cors = require('cors');
const connection = require('./dbconnection');
const { Server } = require('socket.io');
const http = require('http');

connection();
const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/signup', require('./routes/userRoute'));
app.use('/api/login', require('./routes/loginRoute'));
app.use('/api/items', require('./routes/itemRoute'));
app.use('/api/profile', require('./routes/profileRoute'));
app.use('/api/comments', require('./routes/commentRoute'));
app.use('/api/email', require('./routes/emailRoute'));
app.use('/api/reset', require('./routes/reset-password'));
app.use('/api/forgot-password', require('./routes/forgot-password'));
app.use('/api/transaction', require('./routes/transactionRoute'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Store chat history in a variable
const chatHistory = {};
const chatRooms = new Set();

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Emit the list of existing rooms to the newly connected user
  socket.emit('rooms_list', Array.from(chatRooms));

  socket.on('join_specific_room', ({ room, username }) => {
    // Join the room
    socket.join(room);

    // Emit chat_history event with the relevant chat history for the selected room
    if (chatHistory[room]) {
      io.to(socket.id).emit('chat_history', chatHistory[room]);
    }

    // Notify others in the room that a new user has joined
    io.to(room).emit('room_joined', username);

    // Broadcast the updated list of rooms to all connected users
    io.emit('rooms_list', Array.from(chatRooms));
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('recieve_message', data);

    // Save the message to chat history
    if (!chatHistory[data.room]) {
      chatHistory[data.room] = [];
    }
    chatHistory[data.room].push(data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server Running now');
});