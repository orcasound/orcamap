var express = require('express');
var path = require('path');

// Create an server
var server = express();

// Serve the www directory
server.use(express.static(path.resolve(__dirname, 'www')));

// Send 404 for unknown routes
server.get('*', (request, response) => {
  response.sendFile(`${__dirname}/www/404.html`);
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server listening on port http://localhost:3000...');
});
