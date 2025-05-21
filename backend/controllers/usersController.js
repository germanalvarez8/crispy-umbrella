const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/users.json');

const saveUsers = (usersList) => {
    fs.writeFileSync(dbPath, JSON.stringify(usersList, null, 2));
}

const usersList = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');

    return JSON.parse(data);
}

const getAllUsers = (req, res) => {
    if (fs.existsSync(dbPath)) {
        return res.json(usersList());
    } else {
        return res.status(404).json({ error: 'No hay usuarios registrados' });
    }
};

const getUserById = (req, res) => {
    const user = usersList().find(user => user.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
};

const createUser = (req, res) => {
    const { name, email, age, gender } = req.body;

    if (!name || !email || !age || !gender) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    let userList = usersList();
    const emailExists = userList.some(user => user.email === email);
    if (emailExists) {
        return res.status(400).json({ error: 'El email ya está en uso' });
    }

    const newUser = { id: userList.length + 1, name, email, age, gender };
    userList.push(newUser);
    saveUsers(userList);
    return res.status(201).json(newUser);
};

const updateUser = (req, res) => {
    const userList = usersList();
    const existingUser = userList.find(user => user.id === parseInt(req.params.id));
    if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    const { name, email, age, gender } = req.body;

    const emailExists = userList.some(user => user.email === email && user.id !== existingUser.id);
    if (email && emailExists) {
        return res.status(400).json({ error: 'El email ya está en uso' });
    }

    if (name) existingUser.name = name;
    if (email) existingUser.email = email;
    if (age) existingUser.age = age;
    if (gender) existingUser.gender = gender;

    saveUsers(userList);
    res.json(existingUser);
};

const deleteUser = (req, res) => {
    let userList = usersList();
    const existingUser = userList.find(user => user.id === parseInt(req.params.id));
    if (!existingUser) {
        return res.status(404).json({ error: 'User not found' });
    }

    userList = userList.filter(user => user.id !== existingUser.id);
    saveUsers(userList);
    res.json({ message: 'User deleted successfully' });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};