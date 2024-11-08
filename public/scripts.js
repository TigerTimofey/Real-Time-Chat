const socket = io("http://localhost:4000", {
  auth: {
    secret: "This is a secret",
  },
});

// Show the modal to ask for the username
const usernameModal = new bootstrap.Modal(
  document.getElementById("usernameModal"),
  {
    backdrop: "static", // Prevent closing the modal by clicking outside
    keyboard: false, // Prevent closing the modal with the keyboard
  }
);
usernameModal.show();

// Wait for the user to enter the username and submit it
document.getElementById("set-username").addEventListener("click", () => {
  const username = document.getElementById("username-input").value;
  if (username) {
    // Send the username to the server
    socket.emit("setUsername", username);

    // Hide the modal after the username is set
    usernameModal.hide();
  } else {
    alert("Username cannot be empty!");
  }
});

// Receive all previous messages on connection
socket.on("previousMessages", (messages) => {
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML = ""; // Clear previous content
  messages.forEach((message) => {
    messagesContainer.innerHTML += `<li>${message}</li>`;
  });
});

// Handle new messages from the server
socket.on("messageFromServerToAllClient", (newMessage) => {
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML += `<li>${newMessage}</li>`;
});

// Handle clearing messages event
socket.on("messagesCleared", () => {
  document.getElementById("messages").innerHTML = "";
});

// Sending new message to the server
document.getElementById("messages-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newMessage = document.getElementById("user-message").value;
  document.getElementById("user-message").value = "";
  socket.emit("messageFromClientToServer", newMessage);
});

// Handle the clear button to clear the chat
document.querySelector(".btn-clear").addEventListener("click", () => {
  socket.emit("clearMessages");
});

// Handle new users when someone joins or leaves
socket.on("newClient", (message) => {
  const messagesContainer = document.getElementById("messages");
  messagesContainer.innerHTML += `<li>${message}</li>`;
});
