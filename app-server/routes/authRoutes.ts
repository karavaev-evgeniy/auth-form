import express from "express";
import * as authController from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", authController.login);
router.get("/user", authenticateToken, authController.getUser);
router.post("/logout", authController.logout);

export default router;
