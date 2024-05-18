const Email = require('../models/emailModel');
const User = require('../models/userModel');

const createEmail = async (req, res) => {
  const { subject, body, recipients } = req.body;

  if (!subject || !body || !recipients) {
    return res.status(400).json({ message: 'Subject, body, and recipients are required' });
  }

  const recipientEmails = recipients.split(',').map(email => email.trim());
  const recipientUsers = await User.find({ email: { $in: recipientEmails } });

  if (recipientUsers.length !== recipientEmails.length) {
    return res.status(400).json({ message: 'One or more recipient emails are invalid' });
  }

  const email = new Email({
    sender: req.user._id,
    recipients: recipientUsers.map(user => user._id),
    subject,
    body,
  });

  await email.save();

  res.json({
    _id: email._id,
    sender: req.user.email,
    recipients: recipientUsers.map(user => user.email),
    subject,
    body,
    sentAt: email.sentAt,
    archived: email.archived,
  });
};

const getEmailsByCategory = async (req, res) => {
  const { emailCategory } = req.params;

  let filter = {};

  if (emailCategory === 'inbox') {
    filter = { archived: false, recipients: req.user._id };
  } else if (emailCategory === 'archived') {
    filter = { archived: true, recipients: req.user._id };
  } else if (emailCategory === 'sent') {
    filter = { sender: req.user._id };
  } else {
    return res.status(404).json({ message: 'Invalid email category' });
  }

  const emails = await Email.find(filter).sort({ sentAt: -1 });

  res.json(emails);
};

const getEmailById = async (req, res) => {
  const { emailId } = req.params;

  const email = await Email.findById(emailId).populate('sender', 'email').populate('recipients', 'email');

  if (!email) {
    return res.status(404).json({ message: 'Email not found' });
  }

  if (!email.recipients.some(r => r._id.toString() === req.user._id.toString()) && email.sender._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  res.json(email);
};

const updateEmail = async (req, res) => {
  const { emailId } = req.params;
  const { archived } = req.body;

  const email = await Email.findById(emailId);

  if (!email) {
    return res.status(404).json({ message: 'Email not found' });
  }

  if (!email.recipients.some(r => r._id.toString() === req.user._id.toString()) && email.sender._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  email.archived = archived;
  await email.save();

  res.json(email);
};

const deleteEmail = async (req, res) => {
  const { emailId } = req.params;

  const email = await Email.findById(emailId);

  if (!email) {
    return res.status(404).json({ message: 'Email not found' });
  }

  if (!email.recipients.some(r => r._id.toString() === req.user._id.toString()) && email.sender._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await email.deleteOne();

  res.json({ message: 'Email deleted' });
};

module.exports = {
  createEmail,
  getEmailsByCategory,
  getEmailById,
  updateEmail,
  deleteEmail,
};
