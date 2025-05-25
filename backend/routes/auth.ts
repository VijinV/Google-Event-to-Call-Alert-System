import { Router } from "express";
import {
  getMeController,
  googleAuthController,
} from "../controllers/authController";
import { authenticateJWT } from "../middleware/authMiddleware";

const authRoutes = Router();

authRoutes.post("/google", googleAuthController);

authRoutes.get("/me", authenticateJWT, getMeController);

export default authRoutes;
