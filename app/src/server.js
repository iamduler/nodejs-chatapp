const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words'); // 3.0.4

const app = express();

const publicPathDir = path.join(__dirname, '../public');
app.use(express.static(publicPathDir));

const server = http.createServer(app); // Khởi tạo server từ express & http
const io = socketio(server); // Init socketIO with server

// Connection - lắng nghe sự kiện kết nối từ client nào đó
io.on("connection", (socket) => {
    // Send message to the newest client
    socket.emit("Server send message", 'Welcome to the chat app!');

    // Using broadcast
    // Send message to others
    socket.broadcast.emit("Server send message", 'New member just joined with us!');

    // Disconnect
    socket.on('disconnect', () => {
        // Khi client đóng tab/ đóng trình duyệt
        console.log('Client left server.');
    })

    socket.on('Client send message', (message, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            callback("Invalid message content.");
            return;
        }

        io.emit("Server send message", message);
        callback();

    })
})

const port = 3000;
server.listen(port, () => {
    console.log(`App run on http://localhost:${port}`);
});