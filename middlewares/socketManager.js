const socketIO = require("socket.io");
const UserConnect = require("../model/userConnectModel");

function init(httpServer) {
  const io = socketIO(httpServer, {
    cors: {
      origin: "http://192.168.1.133:5173",
    },
  });

  io.on("connection", async (socket) => {
    console.log("A user connected " + socket.id);

    const connection = new UserConnect({
      socketId: socket.id,
    });

    const totalConnections = await UserConnect.find().countDocuments();

    connection.save();

    // Emit an event to update total connections on the front end
    io.emit("updateTotalConnections", totalConnections + 1);

    socket.on("disconnect", async () => {
      console.log("A user disconnected");
      await UserConnect.findOneAndDelete({ socketId: socket.id });
      
      // Get the updated total connections after disconnection
      const updatedTotalConnections = await UserConnect.find().countDocuments();
      
      // Emit an event to update total connections on the front end
      io.emit("updateTotalConnections", updatedTotalConnections);
    });
  });
}

module.exports = {
  init,
};
