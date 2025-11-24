import { tool } from "@langchain/core/tools";
import axios from "axios";
import { json, z } from "zod";
import config from "../config/config.js";

export const Add = tool(
    async ({ a, b }) => {
        const result = a + b;
        return JSON.stringify(result);
    },
    {
        name: "Add",
        description: "Add two numbers",
        schema: z.object({
            a: z.number().describe("The first number"),
            b: z.number().describe("The second number"),
        }),
    }
);

export const getWeather = tool(
    async ({ city }) => {
        const res = await axios.get(
            "http://api.weatherapi.com/v1/current.json",
            {
                params: {
                    key: config.WEATHER_API_KEY,
                    q: city,
                },
            }
        );

        return JSON.stringify(res.data);
    },
    {
        name: "getWeather",
        description: "Gets weather data",
        schema: z.object({
            city: z.string().describe("City to get weather"),
        }),
    }
);
