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

// Send location
document.getElementById('send-location-btn').addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert('Browser not support location');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        console.log('Position:', position);
        const { latitude, longitude } = position.coords;

        socket.emit('Client send location', { latitude, longitude });
    });
})

// Listen event server send location
socket.on('Server send location', (locationUrl) => {
    console.log(locationUrl);  
})

// Process query string
const queryString = location.search;
const params = Qs.parse(location.search, { ignoreQueryPrefix: true });

const { room, username } = params;
socket.emit('Join room client event', { room, username });

// Process user list
socket.on('Send user list from server to client', (userList) => {
    console.log(userList);
})

socket.on('User left room from server to client', (user, userList) => {
    console.log(userList);
    console.log(`User ${user.username} just left the room!`);
})