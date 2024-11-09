const express = require("express");
const app = express();
// app.use(express.static("frontend/public"));

const port = 4000;
const expressServer = app.listen(port);
console.log(`Server is running on port ${port}`);

const { Server } = require("socket.io");
const io = new Server(expressServer, {
  cors: {
    origin: "https://front-chat-flame.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// Array to store all messages
let messages = [];

// Generate a random color for the user
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

io.on("connection", (socket) => {
  console.log(`${socket.id} has joined our server!`);

  let username = "";
  let userColor = getRandomColor();

  // Handle receiving username from client
  socket.on("setUsername", (name) => {
    username = name;
    console.log(`Username set for ${socket.id}: ${username}`);

    // Send all previous messages to the new client
    socket.emit("previousMessages", messages);

    // Notify all other clients about the new user
    io.emit("newClient", `${username} has joined the chat`);
  });

  // Handle receiving a new message from client
  socket.on("messageFromClientToServer", (newMessage) => {
    const messageWithUsername = {
      username: username,
      message: newMessage,
      color: userColor,
    };
    messages.push(messageWithUsername);
    io.emit("messageFromServerToAllClient", messageWithUsername);
  });

  // Handle clearing messages
  socket.on("clearMessages", () => {
    messages = [];
    io.emit("messagesCleared");
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`${socket.id} has disconnected`);
    if (username) {
      io.emit("newClient", `${username} has left the chat`);
    }
  });
});
