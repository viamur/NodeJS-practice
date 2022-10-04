const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { checkUser, findByIdUser, signupUser } = require('../service');

const SECRET_KEY = process.env.SECRET_KEY;

router.post('/signup', async (req, res) => {
  const { name, password } = req.body;
  try {
    /* Перевіряємо користувача в наявності в бд */
    const check = await checkUser({ name });
    if (check) {
      res.status(409).json({ message: 'Name in use' });
      return;
    }
    /* Шифруємо пароль */
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await signupUser({
      name,
      password: hashPassword,
    });
    res.status(201).json({ status: 'success', newUser: result.name });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  /* Беремо данні з боді */
  const { name, password } = req.body;
  try {
    /* Перевіряємо є чи такий користувач у БД */
    const user = await checkUser({ name });
    if (!user) {
      res.status(400).json({ message: 'Nof found user' });
      return;
    }
    /* Робимо перевірку паролю */
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(400).json({ message: 'Not correct password' });
      return;
    }
    /* Робимо токін */
    const payload = {
      name: user.name,
      id: user._id.toString(),
    };
    const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    /* Відправляємо відповідь */
    res.json({ user: user.name, token: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
