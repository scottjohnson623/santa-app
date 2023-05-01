import { Router } from "express";
import { createMessage } from "../../controllers/messages.controller";

export const messageRoutes: Router = Router();

messageRoutes.post("/", createMessage);
