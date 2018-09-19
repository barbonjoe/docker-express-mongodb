import express from "express";

import { getDB } from "../lib/db";

const router = express.Router();

/* GET home page. */
router.get("/", (_, res) => {
  res.json({ title: "Express" });
});

/* GET Userlist page. */
router.get("/userlist", (_, res) => {
  const db = getDB();

  db.collection("users")
    .find({})
    .toArray((err, result) => {
      if (err) {
        throw err;
      }

      res.json({
        userlist: result
      });
    });
});

/* GET New User page. */
router.get("/newuser", (_, res) => {
  res.json({ title: "Add New User" });
});

export default router;
