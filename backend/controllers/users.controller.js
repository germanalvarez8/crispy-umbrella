const { User } = require('../models');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Excluimos la contraseña por seguridad
        });

        if (users.length === 0) {
            return res.status(404).json({ error: 'No hay usuarios registrados' });
        }

        return res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, age, password, role } = req.body;

        if (!name || !email || !age || !password) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está en uso' });
        }

        const newUser = await User.create({
            name,
            email,
            age,
            password,
            role: role || 'client'
        });

        const { password: _, ...userWithoutPassword } = newUser.toJSON();
        return res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Datos de validación incorrectos' });
        }
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateUser = async (req, res) => {
    try {
        const existingUser = await User.findByPk(req.params.id);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { name, email, age, password, role } = req.body;

        if (email && email !== existingUser.email) {
            const emailExists = await User.findOne({ where: { email } });
            if (emailExists) {
                return res.status(400).json({ error: 'El email ya está en uso' });
            }
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (age !== undefined) updateData.age = age;
        if (password !== undefined) updateData.password = password;
        if (role !== undefined) updateData.role = role;

        await existingUser.update(updateData);

        const { password: _, ...userWithoutPassword } = existingUser.toJSON();
        return res.json(userWithoutPassword);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Datos de validación incorrectos' });
        }
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const existingUser = await User.findByPk(req.params.id);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        await existingUser.destroy();
        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};