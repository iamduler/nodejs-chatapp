const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words'); // 3.0.4
const { createMessage } = require('./utils/create-message');
const { getUserList, addUser, removeUser, getUserById } = require('./utils/users');

const app = express();

const publicPathDir = path.join(__dirname, '../public');
app.use(express.static(publicPathDir));

const server = http.createServer(app); // Khởi tạo server từ express & http
const io = socketio(server); // Init socketIO with server

// Connection - lắng nghe sự kiện kết nối từ client nào đó
io.on("connection", (socket) => {
    socket.on('Join room client event', ({ room, username }) => {
        socket.join(room); // to subscribe the socket to a given channel
        
        // Process user list
        let newUser = {
            id: socket.id,
            username,
            room,
        };

        addUser(newUser);
        io.to(room).emit('Send user list from server to client', getUserList(room));

        // Send message to the newest client
        socket.emit("Server send message", createMessage(`Hi ${username}, welcome to the ${room} room!`));

        // Using broadcast to Send message to others
        socket.broadcast.to(room).emit("Server send message", createMessage(`${username} just joined room ${room}!`));

        // Listen event send message
        socket.on('Client send message', (message, callback) => {
            const filter = new Filter();
            const id = socket.id;
            const user = getUserById(id);
    
            if (filter.isProfane(message)) {
                callback("Invalid message content.");
                return;
            }
    
            io.to(room).emit("Server send message", createMessage(message, user));
            callback();
        })
        
        // Listen event send location
        socket.on('Client send location', ({ latitude, longitude }) => {
            const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            io.to(room).emit('Server send location', locationUrl);
        })

        // Disconnect
        socket.on('disconnect', () => {
            // Khi client đóng tab/ đóng trình duyệt
            const leftUser = getUserById(socket.id);
            removeUser(socket.id);
            io.to(leftUser.room).emit('User left room from server to client', getUserList(leftUser.room));
            io.to(leftUser.room).emit('Server send message', createMessage(`User ${leftUser.username} just left the room!`));
        })
    });

})

const port = 3000;
server.listen(port, () => {
    console.log(`App run on http://localhost:${port}`);
});