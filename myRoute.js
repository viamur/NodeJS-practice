const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// определим домашний роутер
router.get('/', async (req, res) => {
  const data = await req.db.cats.find().toArray();
  res.json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await req.db.cats.findOne({ _id: ObjectId(id) });
  res.json(data);
});

router.post('/add', async (req, res) => {
  const data = req.body;
  const respons = await req.db.cats.insertOne({ ...data });
  res.json(respons);
});

router.patch('/patch/:id', async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const respons = await req.db.cats.updateOne({ _id: ObjectId(id) }, { $set: { ...data } });
  res.json(respons);
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const respons = await req.db.cats.deleteOne({ _id: ObjectId(id) });
  res.json(respons);
});

module.exports = router;
