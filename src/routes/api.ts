import express from "express";
import { getDB } from "lib/db";

const router = express.Router();

/* GET home page. */
router.get("/data", (_, res) => {
  const db = getDB();

  db.collection("people")
    .find({}, { limit: 12 })
    .toArray((err, result) => {
      if (err) {
        throw err;
      }

      res.json({
        people: result
      });
    });
});

export default router;
