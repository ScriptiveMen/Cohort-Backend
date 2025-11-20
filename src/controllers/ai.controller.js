import ChatGemini from "../services/ai.service.js";

export async function AIMessage(req, res) {
    const { prompt } = req.body;

    const result = await ChatGemini(prompt);

    res.status(200).json({
        message: "AI Response",
        content: result.content,
    });
}
