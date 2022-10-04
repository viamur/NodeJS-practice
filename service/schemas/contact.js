const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');

const contact = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    who: {
      type: String,
      enum: ['admin', 'staff', 'developer', 'user'],
      default: 'user',
    },
    kod: {
      type: String,
      match: /[0-1]{1}-[0-9]{2}/,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model('Contacts', contact);

module.exports = Contact;
