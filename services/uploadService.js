const path = require("path");
// const FileModel = require("../models/file");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const uploadFilePath = path.join(__dirname, "..", "files");

// console.log(uploadFilePath);

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, uploadFilePath);
  },

  filename: (req, file, cb) => {
    // console.log("file------->",file.originalname);
    const fileName = uuidv4() + path.extname(file.originalname);
    // console.log(fileName);
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
