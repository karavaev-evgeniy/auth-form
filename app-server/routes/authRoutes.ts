import express from "express";
import * as authController from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";
import {
	validateLogin,
	validateRegistration,
} from "../middleware/validationMiddleware";

const router = express.Router();

router.post("/login", validateLogin, authController.login);
router.post("/register", validateRegistration, authController.register);
router.get("/user", authenticateToken, authController.getUser);
router.post("/logout", authController.logout);

export default router;
