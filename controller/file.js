const FileModel = require("../models/file");
const fileUpload = require("../services/uploadService");
const mailService = require("../services/mailService");

const uploadFile = async (req, res) => {
  const upload = fileUpload.single("file");

  upload(req, res, async (error) => {
    // console.log(req.body);
    if (error) {
      console.log("ERROR WHILE UPLOADING FILE", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong, please try again after sometime",
        error: error.message,
      });
    }

    if (!req.file) {
      console.error("No file received");

      return res.status(400).json({
        success: false,
        message: "NO file received",
      });
    }

    console.log("Upload file:", req.file);
    // Save the file in DB
    // console.log(req.file);

    try {
      const newFile = new FileModel({
        originalFilename: req.file.originalname,
        newFilename: req.file.filename,
        path: req.file.path,
      });

      const newlyInsertedFile = await newFile.save();

      // console.log("File uploaded successfully");
      res.json({
        success: true,
        message: "File uploaded successfully",
        fileId: newlyInsertedFile._id,
      });
    } catch (saveError) {
      console.log("ERROR_OCCURRED_WHILE_SAVING_FILE", saveError);
      res.status(500).json({
        success: false,
        message: "File save failed",
        error: saveError.message,
      });
    }
  });
};

const generateDynamicLink = async (req, res) => {
  try {
    const fileId = req.params.uuid;
    const file = await FileModel.findById(fileId);

    if (!file) {
      console.log("File is not present wiht given ID");

      res.status(404).json({
        success: false,
        message: "File with given Id is not present",
      });
    }

    console.log(file);

    res.status(200).json({
      success: true,
      message: "Generated dynamic API link",
      result: "http://localhost:8080/files/download/" + fileId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong , Try after some time",
    });
  }
};

const dowloadLink = async (req, res) => {
  try {
    const fileId = req.params.uuid;
    const file = await FileModel.findById(fileId);

    if (!file) {
      console.log("File not found with given ID");

      res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    res.download(file.path, file.originalFilename);
  } catch (error) {
    console.log(error);
  }
};

const sendLink = async (req, res) => {
  console.log(req.body);

  const { fileId, shareTo } = req.body;

  const downloadableLink = "http://localhost:8080/files/download/" + fileId;

  const info = await mailService.sendMail({
    from: "do-not-reply@mail.com",
    to: shareTo,
    subject: "This is the link to download the file",
    html: `<html>
        <head></head>
        <body>
        <h1>You got a mail for the download the file</h1>
        <br>
        <a href="${downloadableLink}">click here</a>
        </body>
        </html>`,
  });

  console.log("Message sent: %s", info.messageId);

  res.json({
    success: true,
    message: "File shared on email successfully",
  });
};

const fileController = {
  uploadFile,
  generateDynamicLink,
  dowloadLink,
  sendLink,
};

module.exports = fileController;
