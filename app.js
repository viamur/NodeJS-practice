const express = require('express');
const path = require('path');
const app = express();
// const myRouter = require('./myRoute');

// app.use('/my-router', myRouter);

// app.get('/contact*', (req, res) => {
//   res.send('Hello World!');
// });

// app.use((req, res, next) => {
//   console.log('Наше промежуточное ПО');
//   //   next();
// });

// app.use(express.static(path.join(__dirname + '/public')));

// app.get('/constacts/:id', (req, res) => {
//   res.send(`<h1>${req.params.id}</h1>`);
// });

// app.get('/contacts', (req, res) => {
//     console.log(req.query)
//   res.send(`<h1>${req.query}</h1>`);
// });

// app.use(express.json());

// app.post('/login', (req, res, next) => {
//   console.log(req.body);
//   res.status(201);
//   res.send('Ok');
// });

// app
//   .route('/blog')
//   .get((req, res) => {
//     res.send('this get');
//   })
//   .post((req, res) => {
//     res.send('this post');
//   })
//   .delete((req, res) => {
//     res.send('this delete');
//   });

// app.get('/user/:id/phone', (req, res) => {
//   console.log(req.params);
//   res.send(`<h1>${req.params.id}</h1>`);
// });

/* СКАЧИВАНИЕ ФАЙЛОВ */
// app.get('/download', (req, res) => {
//   const file = __dirname + '/public/test.txt';
//   res.download(file, 'hello.html');
// });

// app.get('/download', (req, res) => {
//   const file = __dirname + '/public/index.html';
//   res.sendFile(file);
// });

// app.get('/download', (req, res) => {
//   res.redirect('https://google.com/');
// });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
