import express from "express";
import authRouter from "./authRouter.js";
import eventRouter from "./eventRouter.js";
import photoRouter from "./photoRouter.js";
import testRouter from './testRouter.js'
const router = express.Router();

router.use("/auth", authRouter);
router.use("/event", eventRouter);
router.use("/photo", photoRouter);
router.use("/test", testRouter);

export default router;
