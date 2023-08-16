const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let textContent = '';

io.on('connection', (socket) => {
  socket.emit('updateText', textContent);
  socket.on('editText', (text) => {
    textContent = text;
    socket.broadcast.emit('updateText', textContent);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
