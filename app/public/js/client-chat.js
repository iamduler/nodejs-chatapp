// Yêu cầu server kết nối với client
const socket = io();

document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let message = document.getElementById('input-message').value;

    // Khai báo 1 hàm callback để server trả về lỗi cho client (nếu có)
    const acknowledgements = (error) => {
        if (error) console.log(error);
    }

    socket.emit('Client send message', message, acknowledgements);
})

socket.on('Server send message', (message) => {
    console.log(message);
})