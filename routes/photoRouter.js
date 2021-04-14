import express from "express";
const router = express.Router();
import photoController from "../controllers/photoController.js";

router.get("/:id", photoController.getAll);
router.post("/:id", photoController.getOne);
router.post("/", photoController.create);
router.put("/:id", photoController.edit);
router.delete("/:id", photoController.delete);

export default router;
