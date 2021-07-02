import express from "express";
const router = express.Router();

router.get("/test", (req, res)=>{
  return res.json('its.working')
});

export default router;
