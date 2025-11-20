import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import config from "../config/config.js";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: config.GEMINI_API_KEY,
});

async function ChatGemini(prompt) {
    const promptTemplate = PromptTemplate.fromTemplate(`
        Explain {prompt} as ELI5.
        Make your answer short, clear and concise.
        Don't use Jargons.
        Make sure you include core concepts.
        `);

    const chain = promptTemplate.pipe(model);
    const response = await chain.invoke({ prompt });

    return response;
}

export default ChatGemini;
