const express = require("express");

const mongoose = require("mongoose");

const app = express();

const fileRoutes = require("./router/file");

app.use(express.json());

app.use(fileRoutes);

mongoose.connect("mongodb://localhost:27017/fileSharingApp")
.then(() => console.log("DB connection established successfully"))
.catch((err) => console.log("Error Occured"+err));

app.listen(8080 , () => {
    console.log("App is up and running on port 8080");
})

