const formatTime = require('date-format');

const createMessage = (text, user = '') => {
    let message = {
        text,
        createAt: formatTime('dd-MM-yyyy hh:mm:ss', new Date()),
        username: 'System'
    }

    if (user) {
        message.username = user.username;
    }

    return message;
}

module.exports = {
    createMessage,
}