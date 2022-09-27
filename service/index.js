const Contact = require('./schemas/contact');

const getAllContacts = async () => {
  return Contact.find();
};

const createContact = async body => {
  return Contact.create(body);
};

const deleteContact = async id => {
  return Contact.findByIdAndDelete(id);
};

module.exports = { getAllContacts, createContact, deleteContact };
