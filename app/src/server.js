const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words'); // 3.0.4
const { createMessage } = require('./utils/create-message');

const app = express();

const publicPathDir = path.join(__dirname, '../public');
app.use(express.static(publicPathDir));

const server = http.createServer(app); // Khởi tạo server từ express & http
const io = socketio(server); // Init socketIO with server

// Connection - lắng nghe sự kiện kết nối từ client nào đó
io.on("connection", (socket) => {
    socket.on('Join room client event', ({ room, username }) => {
        socket.join(room); // to subscribe the socket to a given channel

        // Send message to the newest client
        socket.emit("Server send message", `Hi ${username}, welcome to the ${room} chat app!`);

        // Using broadcast
        // Send message to others
        socket.broadcast.to(room).emit("Server send message", createMessage(`${username} just joined room ${room}!`));

        // Disconnect
        socket.on('disconnect', () => {
            // Khi client đóng tab/ đóng trình duyệt
        })

        // Listen event send message
        socket.on('Client send message', (message, callback) => {
            const filter = new Filter();
    
            if (filter.isProfane(message)) {
                callback("Invalid message content.");
                return;
            }
    
            io.to(room).emit("Server send message", createMessage(message));
            callback();
        })
        
        // Listen event send location
        socket.on('Client send location', ({ latitude, longitude }) => {
            const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            io.to(room).emit('Server send location', locationUrl);
        })
    });

})

const port = 3000;
server.listen(port, () => {
    console.log(`App run on http://localhost:${port}`);
});