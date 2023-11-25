let users = {};

module.exports = function setupChat(io) {
  io.on("connection", (socket) => {
    const username = socket.handshake.query.username;
    users[socket.id] = username;

    console.log(`${username} connected with socket ID: ${socket.id}`);
    updateUser(io);

    socket.on("chat message", (data) => {
      io.emit("chat message", data);
    });

    socket.on("disconnect", () => {
      console.log(`${username} disconnected`);
      delete users[socket.id];

      updateUser(io);
    });
  });
};

function updateUser(io) {
  io.emit("users list", users);
}
