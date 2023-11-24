const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const config = require("../config");

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
  organization: config.openaiOrganizationId,
});

router.post("/openai", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const responseData = {
      id: response.id,
      model: response.model,
      response: response.choices[0].message,
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

module.exports = router;
