const roles = require("../models/roles.model");
const classes = require("../models/class.model");
const school = require ("../models/school.model");

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
    class : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class', 
        required : true
    },
    dob : {
        type : String,
        required : true
    },
});

module.exports = mongoose.model('Users',userSchema);
