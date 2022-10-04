const jwt = require('jsonwebtoken');
const { findByIdUser } = require('../service/index');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || token === '') {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }
  try {
    console.log({ token, SECRET_KEY });
    const { name, id } = jwt.verify(token, SECRET_KEY);
    if (!id) {
      res.status(401).json({ message: 'Not correct token' });
      return;
    }
    const user = await findByIdUser({ id });
    console.log(user);
    if (!user) {
      res.status(401).json({ message: 'Not correct token' });
      return;
    }
    req.user = { id: user.id, name: user.name };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = auth;
