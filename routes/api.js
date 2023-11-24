const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const config = require("../config");

require("dotenv").config();

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
  organization: config.openaiOrganizationId,
});

router.post("/openai", async (req, res) => {
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

module.exports = router;
