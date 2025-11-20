import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const _config = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};

export default Object.freeze(_config);
