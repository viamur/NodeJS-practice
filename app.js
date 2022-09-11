const fs = require('fs').promises;
const path = require('path');

const bookPath = path.join(__dirname)

async function getAll() {
    const result = await fs.readFile(bookPath);

    return JSON.parse(result.toString());
}

async function addBook(title, author) 
const books = await getAll();
const book = books.find(({author}) => author === author)

if (!book) {
    throw new Error('book not found');
} 
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

fs.readFile('hello.txt', 'utf-8').then(data => console.log(data));

