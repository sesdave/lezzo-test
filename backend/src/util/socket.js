// socket.js
const socketIo = require('socket.io');

module.exports = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A client connected');

    // Handle events here
    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
  });
};
