const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION_ID,
});

app.post("/openai", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 150,
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (data) => {
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(4000, () => {
  console.log("Listening on *:4000");
});
