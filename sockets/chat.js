// sockets/chat.js
module.exports = function setupChat(io) {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat message", (data) => {
      io.emit("chat message", data);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
