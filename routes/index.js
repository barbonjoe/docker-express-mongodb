import express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

/* GET Userlist page. */
router.get("/userlist", (req, res) => {
  const db = req.db;
  db.collection("users")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;

      res.render("userlist", {
        userlist: result
      });
    });
});

/* GET New User page. */
router.get("/newuser", (req, res) => {
  res.render("newuser", { title: "Add New User" });
});

/* POST to Add User Service */
router.post("/adduser", (req, res) => {
  // Set our internal DB constiable
  const db = req.db;

  // Get our form values. These rely on the "name" attributes
  const userName = req.body.username;
  const userEmail = req.body.useremail;

  // Set our collection
  const collection = db.get("usercollection");

  // Submit to the DB
  collection.insert(
    {
      username: userName,
      email: userEmail
    },
    err => {
      if (err) {
        // If it failed, return error
        res.send("There was a problem adding the information to the database.");
      } else {
        // If it worked, set the header so the address bar doesn't still say /adduser
        //res.location("userlist");
        // And forward to success page
        res.redirect("userlist");
      }
    }
  );
});

export default router;
