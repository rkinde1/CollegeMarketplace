const express = require('express');
const cors = require('cors');
const connection = require('./dbconnection');
const {Server} = require("socket.io");
const http = require("http");

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

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
});

app.use(cors());
const server = http.createServer(app);

const io =new Server(server, {
  cors: {
    origin:"http://localhost:3000",
    methods: ["GET", "POST"],
  },
} );

io.on("connection", (socket) =>{
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`User with ID: ${socket.id} Joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });

  socket.on("disconnect", () =>{
    console.log("User Disconnected")
  });
});

server.listen(3001, () =>{
  console.log("Server Running now")
});