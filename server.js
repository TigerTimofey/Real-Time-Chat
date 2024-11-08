const express = require("express");
const app = express();
app.use(express.static("public"));

const port = 4000;
const expressServer = app.listen(port);
console.log(`Server is running on port ${port}`);

const { Server } = require("socket.io");
const io = new Server(expressServer, {
  cors: {
    origin: "http://127.0.0.1:5501", // The address where the client is running
    methods: ["GET", "POST"],
  },
});

// Array to store all messages
let messages = [];

io.on("connection", (socket) => {
  console.log(`${socket.id} has joined our server!`);

  let username = "";

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
    const messageWithUsername = `${username}: ${newMessage}`;
    messages.push(messageWithUsername);
    io.emit("messageFromServerToAllClient", messageWithUsername);
  });

  // Handle clearing messages
  socket.on("clearMessages", () => {
    messages = []; // Clear the message array
    io.emit("messagesCleared"); // Notify all clients that the chat has been cleared
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`${socket.id} has disconnected`);
    if (username) {
      io.emit("newClient", `${username} has left the chat`);
    }
  });
});
