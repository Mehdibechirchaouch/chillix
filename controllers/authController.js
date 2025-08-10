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
