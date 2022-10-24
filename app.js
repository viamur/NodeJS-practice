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

/* Массив с онлайн пользователями */
let usersChat = [];

io.on('connection', socket => {
  /* Вытягиваем id пользователя который подкл по нашему сокету */
  const { id } = socket;
  /* Добовляем его в массив пользователей онлайн */
  usersChat.push(id);
  console.log('User connected!');
  /* Когда каждый пользователь подсоед то
  Выполняет отправка ВСЕМ пользователям новый список польз онлайн */
  io.emit('chat_online', { usersChat });

  /* Слушаем от КЛИЕНТА сообщение с названием  "CHAT_MESSAGE" */
  socket.on('CHAT_MESSAGE', ({ message }) => {
    /* Ищем в строке значек @ если есть то значит это приватное сообщение */
    const privat = message.includes('@');
    if (privat) {
      /* Вытягиваем с сообщение наше ID */
      const oneArr = message.split(' ')[0];
      const idPrivat = oneArr.slice(1, oneArr.length);

      /* Отправляем приватное сообщение пользователю по ID */
      io.to(idPrivat).emit('CHAT_UPDATE', {
        message: `Приватное сообщение: ${message}`,
      });
      return;
    }

    /* ЕСЛИ НЕ ПРИВАТНОЕ то просто всем отсылаем сообщение */
    io.emit('CHAT_UPDATE', { message });
  });

  /* Происходит когда пользователь отключ от сервера */
  socket.on('disconnect', () => {
    console.log('User disconnect!');
    /* Убираем ID пользователя из массива */
    usersChat = usersChat.filter(el => el !== id);
    /* И отправляем всем пользователям новый список онлайн пользователей */
    io.emit('chat_online', { usersChat });
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
