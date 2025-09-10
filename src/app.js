import { config } from "dotenv";
import express, { response } from "express";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

config();
const app = express();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

const promptTemplate = PromptTemplate.fromTemplate(`
    Explain {topic} like ELI5.
    Keep you answer short and concise, don't use uneccessary jargons.
    `);

const chain = promptTemplate.pipe(model);
chain.invoke({ topic: "Express" }).then((response) => {
  console.log(response.content);
});

export default app;
