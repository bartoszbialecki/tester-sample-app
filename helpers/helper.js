const fs = require("fs");

const readFile = (
  filePath,
  callback,
  returnJson = false,
  encoding = "utf8"
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err;
    }

    callback(returnJson ? JSON.parse(data) : data);
  });
};

const writeFile = (filePath, fileData, callback, encoding = "utf8") => {
  fs.writeFile(filePath, fileData, encoding, err => {
    if (err) {
      throw err;
    }

    callback();
  });
};

module.exports = {
  readFile,
  writeFile
};
