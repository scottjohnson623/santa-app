import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cron from "node-cron";
import { SendMessageList } from "./jobs/sendMessageList";
import { messageList } from "./classes/messageList";
import { apiRoutes } from "./routes/api/api";

dotenv.config();

const app = express();

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms"
);

app.use(express.json());
app.use(morganMiddleware);

app.use(express.static("dist"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/dist/index.html");
});

cron.schedule("*/15 * * * * *", function () {
  SendMessageList.make(messageList).execute();
});

app.use("/api", apiRoutes);

app.use((request, response) => {
  response.status(404).send({ message: `Error: ${request.path} not found` });
});

app.listen(process.env.PORT || 8000);
