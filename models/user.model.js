const roles = require("./roles.model");
const classroom = require("./class.model");
const school = require ("./school.model");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    first_name : {
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
    // Reference to the Roles schema
    roles : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles',  
        required: true
    },
    school : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School', 
        required : true
    },
    //standard + section
    classroom : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class', 
        required : true
    },
    dob : {
        type : String,
        required : true
    },
});

module.exports = mongoose.model('User',userSchema);
