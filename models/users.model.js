const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    full_name : {
        type : String,
        required : true
    },
    middle_name : {
        type : String
    },
    last_name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    contact_no : {
        type : Number,
        required : true
    },
    father_name : {
        type : String,
        required : true
    },
    mother_name : {
        type : String,
        required : true
    },
    roles : {
        type : String,
        required : true
    },
    school : {
        type : String,
        required : true
    },
    class : {
        type : String,
        required : true
    },
    dob : {
        type : String,
        required : true
    },
});

module.exports = mongoose.model('User',userSchema);
