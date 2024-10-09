const mongoose = require("mongoose");

const standard = require("../models/standard.model");
const section = require("../models/section.model");

const classSchema = new mongoose.Schema({

    classroom_code : {
        type : String,
        required : true
    },
    standard : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Standard', 
        required : true
    },
    section : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section', 
        required : true
    }
});

module.exports = mongoose.model('Class',classSchema);
