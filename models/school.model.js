const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({

    school_name : {
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
    duration : {
        type : String,
        required : true
    },
    level : {
        type : String,
        required : true
    }
    //to be calculated from classroom collection (I am still figuring out how)
    // no_of_classroom : {
    //     type : Number
    // }
});

module.exports = mongoose.model('School',schoolSchema);
