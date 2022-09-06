const fs = require('fs').promises;

// fs.readdir(__dirname)
//   .then(files => {
//     return Promise.all(
//       files.map(async filename => {
//         const stats = await fs.stat(filename);
//         return {
//           Name: filename,
//           Size: stats.size,
//           Date: stats.mtime,
//         };
//       })
//     );
//   })
//   .then(result => console.log(result));

// fs.appendFile('test.txt', 'data in txt files');
// fs.rename('test.txt', 'hello.txt');
// fs.readFile('hello.txt').then(data => console.log(data.toString()));
// fs.unlink('test.txt');
