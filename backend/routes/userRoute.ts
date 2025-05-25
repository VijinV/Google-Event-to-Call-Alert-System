import { Router } from "express";
import { updatePhoneNumberController } from "../controllers/userController";
import { authenticateJWT } from "../middleware/authMiddleware";

const userRoutes = Router();

userRoutes.post(
  "/update-phone-number",
  authenticateJWT,
  updatePhoneNumberController
);

export default userRoutes;
