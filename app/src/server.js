const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();

const publicPathDir = path.join(__dirname, '../public');
app.use(express.static(publicPathDir));

const server = http.createServer(app); // Khởi tạo server từ express & http
const io = socketio(server); // Init socketIO with server

var count = 1;
const message = 'Chào mọi người';

// Connection - lắng nghe sự kiện kết nối từ client nào đó
io.on("connection", (socket) => {
    // Mỗi client sẽ được server cung cấp 1 socket
    console.log('New client connected.');

    // Truyền giá trị count từ server -> client
    // emit() giúp gửi dữ liệu theo sự kiện từ server -> client
    socket.emit('Send count from server to client', count);
    socket.emit('Send message from server to client', message);

    // Disconnection
    socket.on('disconnect', () => {
        // Khi client đóng tab/ đóng trình duyệt
        console.log('Client left server.');
    })

    // Nhận sự kiện từ client
    socket.on('Send increment from client to server', () => {
        count++;
        io.emit('Send count from server to client', count); // Using io to send event to all socket
    });
})

const port = 3000;
server.listen(port, () => {
    console.log(`App run on http://localhost:${port}`);
});