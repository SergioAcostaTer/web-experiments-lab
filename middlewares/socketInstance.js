// socketManager.js
const { Server } = require('socket.io');

let io;

function init(httpServer) {
  io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
}

function getIo() {
  return io;
}

module.exports = {
  init,
  getIo,
};
