const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files
app.use(express.static(__dirname));

// Socket.IO event handlers
io.on('connection', function(socket) {
  // Listen for chat messages
  socket.on('chatMessage', function(message) {
    io.emit('chatMessage', message);
  });
});

// Start the server
const port = 3000;
server.listen(port, function() {
  console.log('Server running on port ' + port);
});
