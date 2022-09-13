const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

app.use(fileUpload({}));

app.use(express.static(path.join(__dirname + '/public')));
app.get('/', function (req, res) {
  res.send('Hello World');
});

/* Форма для отправки файлов */
app.get('/form', function (req, res) {
  res.setHeader('content-type', 'text/html;charset=utf-8');
  res.write('<form action="/upload" method="POST" enctype="multipart/form-data" >');
  res.write('<input type="file" name="photo">');
  res.write('<input type="submit">');
  res.write('</form>');
  res.end();
});

/* Загрузка файлов на сервер */
app.post('/upload', function (req, res) {
  req.files.photo.mv('public/' + req.files.photo.name);
  res.end(req.files.photo.name);
  console.log(req.files.photo); // the uploaded file object
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
