const express = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const users = require('./routes/users');
const auth = require('./routes/auth');
const index = require('./routes/index');
require('dotenv').config();
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('User connected!');
  socket.on('CHAT_MESSAGE', ({ message }) => {
    io.emit('CHAT_UPDATE', { message });
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

// /* TAKE CONST FROM .ENV */
// const PORT = process.env.PORT || 3000;
// const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:3000';

// app.use(express.json());
// app.use(morgan('dev'));
// app.use(cors());
// app.use(express.static('public'));

// app.use('/auth', auth);
// app.use('/users', users);
// app.use('/', index);

// app.use(async function (req, res) {
//   res.status(404).send('<h1>Page Not Found</h1>');
// });

// app.use(function (err, req, res, next) {
//   const { status = 500, message = 'Internal server error' } = err;
//   console.error(err);
//   res.status(status).json({ message });
// });

// /* CONNECT TO MONGO DB */
// connect(mongoURL)
//   .then(() => {
//     console.log('MongoDB connected');

//     app.listen(PORT, () => {
//       console.log(`Example app listening on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.log(err.message);
//     process.exit(1);
//   });
