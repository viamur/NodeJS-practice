const fs = require('fs').promises;
var http = require('http');

http
  .createServer(async (request, response) => {
    if (request.method === 'POST') {
      await fs.appendFile('test.txt', `${request.headers['content-type']},\n`);
    }

    response.end();
  })
  .listen(3000);
