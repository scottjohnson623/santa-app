import { Router } from "express";
import { messageRoutes } from "./messages";

export const apiRoutes: Router = Router();

apiRoutes.use("/messages", messageRoutes);
