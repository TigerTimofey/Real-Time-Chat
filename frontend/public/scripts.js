// const socket = io("http://localhost:4000", {
// const socket = io("https://real-time-chat-coral-six.vercel.app", {});
const socket = io(
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://real-time-chat-coral-six.vercel.app",
  {}
);

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getFormattedTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const scrollToBottom = () => {
  const messagesContainer = document.getElementById("messages");
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

// Show the modal to ask for the username
const usernameModal = new bootstrap.Modal(
  document.getElementById("usernameModal"),
  {
    backdrop: "static",
    keyboard: false,
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

  // Loop through all previous messages
  messages.forEach(({ username, message, color }) => {
    const time = getFormattedTime(); // Get the time for each previous message
    messagesContainer.innerHTML += `
        <li>
          <span style="color:${color}; font-weight: bold">${username}</span>: ${message}
          <span style="font-size: 0.8em; color: gray; float: right;">${time}</span>
        </li>
      `;
  });

  // Scroll to the bottom after loading previous messages
  scrollToBottom();
});

// Handle new messages from the server
socket.on("messageFromServerToAllClient", ({ username, message, color }) => {
  const messagesContainer = document.getElementById("messages");
  const time = getFormattedTime(); // Get the time for the new message
  messagesContainer.innerHTML += `
      <li>
        <span style="color:${color}; font-weight: bold">${username}</span>: ${message}
        <span style="font-size: 0.8em; color: gray; float: right;">${time}</span>
      </li>
    `;

  // Scroll to the bottom after receiving a new message
  scrollToBottom();
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
  const time = getFormattedTime(); // Get the current time for the event

  // Add the message with the timestamp to the messages container
  messagesContainer.innerHTML += `
      <li>
        <span>${message}</span>
        <span style="font-size: 0.8em; color: gray; float: right;">${time}</span>
      </li>
    `;

  // Scroll to the bottom after a new user joins or leaves
  scrollToBottom();
});
