const express = require("express");

const router = express.Router();

const fileController = require("../controller/file");

router.post("/api/files/", fileController.uploadFile);

router.get("/files/:uuid" , fileController.generateDynamicLink);

router.get("/files/download/:uuid" , fileController.dowloadLink);

router.post("/api/files/send" , fileController.sendLink);

module.exports = router;