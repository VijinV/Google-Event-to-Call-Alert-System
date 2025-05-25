import { Router } from "express";
import { triggerReminder } from "../controllers/reminderController";
import { authenticateJWT } from "../middleware/authMiddleware";

const reminderRoutes = Router();

reminderRoutes.post("/trigger-reminder", authenticateJWT, triggerReminder);

export default reminderRoutes;
