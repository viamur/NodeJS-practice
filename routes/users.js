const express = require('express');
const service = require('../service');
const auth = require('../service/authUser');

const router = express.Router();
/* GET users listing. */
router.get('/', auth, async (req, res, next) => {
  const { id } = req.user;
  try {
    const data = await service.getAllContacts({ id });
    res.json(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/', auth, async (req, res, next) => {
  const { id } = req.user;
  try {
    const data = await service.createContact({ id, data: req.body });
    res.json(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await service.deleteContact({ id: req.params.id, owner: req.user.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
