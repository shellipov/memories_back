import express from "express";
const router = express.Router();
import eventController from "../controllers/eventController.js";

router.get("/", eventController.getAll);
router.get("/:id", eventController.getOne);
router.post("/", eventController.create);
router.put("/:id", eventController.edit);
router.delete("/:id", eventController.delete);

export default router;
