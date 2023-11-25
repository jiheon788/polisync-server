require("dotenv").config();

const config = {
  port: process.env.PORT || 4000,
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  openaiOrganizationId: process.env.OPENAI_ORGANIZATION_ID || "",
  openaiBeforePrompt: process.env.OPEN_AI_BEFORE_PROMPT || "",
  socketIoOptions: {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  },
};

module.exports = config;
