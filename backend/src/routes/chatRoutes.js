import express from "express";
import { getStreamToken } from "../controllers/chatController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

// Define chat-related routes here
router.get("/token",protectRoute, getStreamToken);

export default router;