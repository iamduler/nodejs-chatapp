let userList = [
    {
        id: '1',
        username: 'CR7',
        room: 'Real Madrid'
    },
    {
        id: '2',
        username: 'Ramos',
        room: 'Real Madrid'
    },
    {
        id: '3',
        username: 'Bale',
        room: 'Real Madrid'
    },
    {
        id: '4',
        username: 'Messi',
        room: 'Barcelona'
    },
    {
        id: '5',
        username: 'Neymar',
        room: 'Barcelona'
    },
    {
        id: '6',
        username: 'Suarez',
        room: 'Barcelona'
    }
]

const getUserList = (room) => userList.filter((user) => user.room === room);
const addUser = (newUser) => userList = [...userList, newUser];
const removeUser = (id) => userList = userList.filter((user) => user.id != id);
const getUserById = (id) => {
    let filteredUser = userList.filter((user) => user.id == id)
    return filteredUser.shift();
};

module.exports = {
    getUserList, 
    addUser,
    removeUser,
    getUserById
}