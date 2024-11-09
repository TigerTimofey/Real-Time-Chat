const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// Initialize Express
const app = express();
const port = 4000;

// Serve static files from the "frontend/public" folder
app.use(express.static("frontend/public"));

// Create an HTTP server for both Express and Socket.IO
const server = http.createServer(app);

// Set up Socket.IO server with CORS enabled
const io = new Server(server, {
  cors: {
    origin: "https://front-chat-flame.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// Array to store all messages
let messages = [];

// Function to generate a random color for the user
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Socket.IO connection handling
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

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
