const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(404).json({ message: 'User not found' });
  if (!await bcrypt.compare(password, user.password)) return res.status(401).json({ message: 'Wrong password' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ token, role: user.role, email: user.email , username: user.username });
};


exports.signup = async (req, res) => {
  const { username,email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await User.create({ username,email, password: hash }); // default sub-admin
  res.status(201).json({ message: 'Signup successful, awaiting approval' });
};



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({ message: 'User updated', user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};