import express from "express";

import { protectRoute } from "../middleware/auth.js";
import {
  getMesaages,
  getUsersForSideBar,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSideBar);
messageRouter.get("/:id", protectRoute, getMesaages);
messageRouter.put("mark/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage);
export default messageRouter;
