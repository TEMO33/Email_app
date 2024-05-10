const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registration = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const user = new User({ email, password });
  await user.save();

  const token = generateToken(user);

  res.json({ email: user.email, _id: user._id, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = generateToken(user);

  res.json({ email: user.email, _id: user._id, token });
};

const status = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ email: decoded.email, _id: decoded._id });
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

module.exports = {
  registration,
  login,
  status,
  logout,
};
