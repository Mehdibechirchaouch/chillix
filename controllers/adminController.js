const User = require('../models/User');

exports.approveUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.approved = true;
  await user.save();
  res.json({ message: 'User approved' });
};

exports.listSubAdmins = async (req, res) => {
  const users = await User.findAll({ where: { role: 'sub-admin' } });
  res.json(users);
};
