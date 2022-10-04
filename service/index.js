const Contact = require('./schemas/contact');
const User = require('./schemas/user');

const getAllContacts = async ({ id }) => {
  return Contact.find({ owner: id }).populate('owner', 'name');
};

const createContact = async ({ id, data }) => {
  return Contact.create({ owner: id, email: data.email, name: data.name });
};

const deleteContact = async ({ id, owner }) => {
  return Contact.findOneAndDelete({ id, owner });
};

/* =============================USER=========================== */

const checkUser = async ({ name }) => {
  return User.findOne({ name: name });
};

const findByIdUser = async ({ id }) => {
  return User.findById(id);
};

const signupUser = async ({ name, password }) => {
  return User.create({ name, password });
};

module.exports = {
  getAllContacts,
  createContact,
  deleteContact,
  checkUser,
  findByIdUser,
  signupUser,
};
