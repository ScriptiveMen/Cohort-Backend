import app from "./src/app.js";
import initSocketServer from "./src/sockets/socket.server.js";
import http from "http";
import connectDB from "./src/db/db.js";

connectDB();

const httpServer = http.createServer(app);
initSocketServer(httpServer);

httpServer.listen(3000, () => {
    console.log("Agent service is running on port 3000");
});
