const express = require("express");

const router = express.Router();

/* GET users listing. */
router.get("/", function handler(req, res) {
  res.send("respond with a resource");
});

module.exports = router;
