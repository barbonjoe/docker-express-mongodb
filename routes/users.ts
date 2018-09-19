import express from "express";

const router = express.Router();

/* GET users listing. */
router.get("/", (_, res) => {
  res.json({ test: "respond with a resource" });
});

export default router;
