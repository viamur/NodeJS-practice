const express = require('express');
const service = require('../service');

const router = express.Router();
/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const data = await service.getAllContacts();
    res.json(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = await service.createContact(req.body);
    res.json(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await service.deleteContact(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
