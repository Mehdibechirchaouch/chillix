const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) return res.status(404).json({ message: 'User not found' });
  if (!await bcrypt.compare(password, user.password)) return res.status(401).json({ message: 'Wrong password' });
  if (!user.approved) return res.status(403).json({ message: 'Not approved' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, role: user.role });
};

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await User.create({ username, password: hash }); // default sub-admin
  res.status(201).json({ message: 'Signup successful, awaiting approval' });
};
