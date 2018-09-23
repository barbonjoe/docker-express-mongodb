import express from "express";

import json from "./random-data.json";

const router = express.Router();

/* GET home page. */
router.get("/data", (_, res) => {
  res.json(json);
});

export default router;
