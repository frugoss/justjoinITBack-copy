const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema ({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    message : {
        type: String
    },
    file : {
        type: String,
        required: true
    },
    offerID: {
        type: String,
        required: true
    },
    checkbox: {
        type: Boolean
    }
})


const Upload = mongoose.model("Upload", uploadSchema);
module.exports = Upload;
