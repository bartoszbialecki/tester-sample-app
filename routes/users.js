const express = require("express");
const fs = require("fs");

const router = express.Router();

const dataPath = "./data/users.json";

const readFile = (
  callback,
  returnJson = false,
  filePath = dataPath,
  encoding = "utf8"
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err;
    }

    callback(returnJson ? JSON.parse(data) : data);
  });
};

const writeFile = (
  fileData,
  callback,
  filePath = dataPath,
  encoding = "utf8"
) => {
  fs.writeFile(filePath, fileData, encoding, err => {
    if (err) {
      throw err;
    }

    callback();
  });
};

// get users list
router.get("/", (req, res) => {
  readFile(data => {
    res.send(data);
  });
});

// create new user
router.post("/", (req, res) => {
  readFile(data => {
    const newUserId = Object.keys(data).length + 1;
    const newUser = {
      id: newUserId,
      ...req.body
    };

    data[newUserId] = newUser;

    writeFile(JSON.stringify(data, null, 2), () => {
      res.status(200).send(`User ${req.body.name} created`);
    });
  }, true);
});

// update user
router.put("/:i", (req, res) => {
  readFile(data => {
    const userId = req.params.id;
    data[userId] = req.body;

    writeFile(JSON.stringify(data, null, 2), () => {
      res.status(200).send(`User updated.`);
    });
  }, true);
});

// delete user
router.delete("/:id", (req, res) => {
  readFile(data => {
    const userId = req.params.id;
    delete data[userId];

    writeFile(JSON.stringify(data, null, 2), () => {
      res.status(200).send(`User removed.`);
    });
  }, true);
});

module.exports = router;
