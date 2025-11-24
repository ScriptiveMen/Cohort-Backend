import { Server } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import agent from "../agent/agent.js";

function initSocketServer(httpServer) {
    const io = new Server(httpServer, {});

    io.use((socket, next) => {
        const cookies = socket.handshake.headers.cookie;
        const { token } = cookies ? cookie.parse(cookies) : {};

        if (!token) {
            return next(new Error("No token provided"));
        }

        try {
            const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
            socket.user = decoded;
            socket.token = token;
            next();
        } catch (error) {
            console.log(err);
            next(new Error("Invalid token"));
        }
    });

    io.on("connection", (socket) => {
        socket.on("message", async (data) => {
            const aiResponse = await agent.invoke(
                {
                    messages: [
                        {
                            role: "user",
                            content: data,
                        },
                    ],
                },
                {
                    metadata: {
                        token: socket.token,
                    },
                }
            );

            const lastMessage =
                aiResponse.messages[aiResponse.messages.length - 1];

            socket.emit("message", lastMessage.content);
        });
    });
}

export default initSocketServer;
