const Contact = require('./schemas/contact');

const getAllContacts = async () => {
  return Contact.find();
};

const createContact = async body => {
  return Contact.create(body);
};

module.exports = { getAllContacts, createContact };
