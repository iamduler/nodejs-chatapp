let userList = [
    // {
    //     id: '1',
    //     username: 'CR7',
    //     room: 'Real Madrid'
    // },
]

const getUserList = (room) => userList.filter((user) => user.room === room);
const addUser = (newUser) => userList = [...userList, newUser];
const removeUser = (id) => userList = userList.filter((user) => user.id != id);
const getUserById = (id) => userList.find((user) => user.id === id);

module.exports = {
    getUserList, 
    addUser,
    removeUser,
    getUserById
}