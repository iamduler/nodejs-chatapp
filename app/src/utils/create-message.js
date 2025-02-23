const formatTime = require('date-format');

const createMessage = (text) => {
    return  {
        text,
        createAt: formatTime('dd-MM-yyyy hh:mm:ss', new Date())
    }
}

module.exports = {
    createMessage,
}