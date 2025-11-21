import { config } from "dotenv";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { GoogleGenAI, Type } from "@google/genai";

config();

const transport = new StdioClientTransport({
    command: "node",
    args: ["./mcp.server.js"],
});

const client = new Client({
    name: "example-client",
    version: "1.0.0",
});

await client.connect(transport);

const ai = new GoogleGenAI({});

const GeminiTools = [];
const mcpTools = await client.listTools();

mcpTools.tools.forEach((tool) => {
    GeminiTools.push({
        name: tool.name,
        description: tool.description,
        parameters: {
            type: Type.OBJECT,
            properties: tool.inputSchema.properties,
            required: tool.inputSchema.required || [],
        },
    });
});

// Send request with function declarations
const aiResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Add 4 and 8.",
    config: {
        tools: [
            {
                functionDeclarations: GeminiTools,
            },
        ],
    },
});

console.log(aiResponse.candidates[0].content.parts);
console.log(mcpTools.tools);
console.log(GeminiTools);
