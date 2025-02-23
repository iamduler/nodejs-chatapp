const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();

const publicPathDir = path.join(__dirname, '../public');
app.use(express.static(publicPathDir));

const server = http.createServer(app); // Khởi tạo server từ express & http
const io = socketio(server); // Init socketIO with server

// Connection - lắng nghe sự kiện kết nối từ client nào đó
io.on("connection", (socket) => {
    // Mỗi client sẽ được server cung cấp 1 socket
    console.log('New client connected.');

    // Disconnection
    socket.on('disconnect', () => {
        // Khi client đóng tab/ đóng trình duyệt
        console.log('Client left server.');
    })
})

const port = 3000;
server.listen(port, () => {
    console.log(`App run on http://localhost:${port}`);
});