const { MongoClient } = require('mongodb');
require('dotenv').config();
const data = {};

const getCats = () => {
  return data;
};

const connectMongo = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://viamur:<PASSWORD>@cluster0.elzmkc9.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
    }
  );
  const db = client.db();

  data.cats = db.collection('cats');
};

module.exports = { connectMongo, getCats };
