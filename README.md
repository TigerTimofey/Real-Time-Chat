# Real-time Chat Application

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-blue)](https://your-project-link)

## Table of contents

🚀 [What does the app do?](#what-does-the-app-do)<br/>
💡 [How to start using the app](#how-to-start-using-the-app)<br/>
⚙️ [App functionality](#app-functionality)<br/>
❔ [Error handling](#error-handling)<br/>
🛠️ [Testing Requirements](#testing-requirements)<br/>
☕ [Version](#version)<br/>
🤝 [Creator](#creator)

## What does the app do?


https://github.com/user-attachments/assets/ccea89ac-b465-4b3b-99c2-60ce894d5a34


The Real-time Chat Application allows users to connect to a server and chat with others in real time. It uses WebSocket for real-time communication between clients and the server. Before joining the chat, users are prompted to provide a username.

## How to start using the app

To run the chat application, follow these steps:

1. Clone the repository to your local machine.
2. Set up a Node.js server and install necessary dependencies.
3. Run the server and open the app in your browser.

### Example usage:

- Clone the GitHub repository:

```bash
$ git clone https://github.com/yourusername/chat-app
```

- Install dependencies:

```bash
$ npm install

```

- Run the server:Run the server:

```bash
$ node server.js
```

- Open the app in your browser:

```bash
$ Open the browser and go to http://localhost:4000

```

## App functionality

- **Real-time messaging**: The app uses Socket.io to enable real-time communication between users.
- **Username prompt**: Upon loading the app, users are asked to input their username before joining the chat.
- **Message sending**: Users can type and send messages to others in real-time.
- **Display messages**: The app displays messages from all users in a clean, formatted chat window.

### Additional Features:

- **Responsive design**: The app is optimized for both mobile and desktop devices.
- **Styled modal**: The username input modal is styled to match the application's theme.

## Error handling

- **Invalid username**: If the username is empty or exceeds the character limit (8 characters), an error message is shown, and the user is prompted again.
- **Socket.io connection error**: If the connection to the WebSocket server fails, an error message will be displayed.
- **Server not running**: If the server isn't running, the app won't be able to connect, and an error message will be displayed in the browser.

## Testing Requirements

1. **Message sending test**: Open the app in multiple browser windows or tabs. Try sending a message in one window and ensure it appears in the others in real time.
2. **Username input validation**: Ensure the username prompt works correctly and restricts the input to a maximum of 8 characters.
3. **Real-time communication**: Test the communication flow: one user sends a message, and other connected users should see it in real time.
4. **Error handling**: Test the app's behavior when the WebSocket server is down or the connection is lost.

### Additional Tests:

- **User interface**: Verify the modal design and ensure that the prompt is styled according to the app's theme.
- **Responsiveness**: Check how the app behaves on different screen sizes (e.g., desktop vs. mobile).

## Version

- "express": "^4.21.1",
- "nodemon": "^3.1.7",
- "socket.io": "^4.8.1

## Creator

[Timofey](https://github.com/TigerTimofey) <br/>
