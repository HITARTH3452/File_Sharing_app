const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    originalFilename : {
        type : String,
        require : true
    },
    newFilename : {
        require : true,
        type : String
    },
    path : {
        type : String,
        require : true
    },
})

const fileModel = mongoose.model("files" , fileSchema);

module.exports = fileModel;