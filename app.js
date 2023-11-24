// app.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const setupChat = require("./sockets/chat");
const config = require("./config");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, config.socketIoOptions);

app.use("/api", apiRoutes);

setupChat(io);

server.listen(config.port, () => {
  console.log(`Listening on *:${config.port}`);
});
