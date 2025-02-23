const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

const publicPathDir = path.join(__dirname, '../public');
app.use(express.static(publicPathDir));

const server = http.createServer(app); // Khởi tạo server từ express & http

const port = 3000;
server.listen(port, () => {
    console.log(`App run on http://localhost:${port}`);
});