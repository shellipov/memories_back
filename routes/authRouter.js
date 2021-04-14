import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.post("/singin", userController.singin);
router.post("/login", userController.login);
router.get("/check", authMiddleware, userController.check);

export default router;
