const mongoose = require("mongoose");

const standardSchema = new mongoose.Schema({

    standard : {
        //want mixed
        type : Number,
        required : true
    }
});

module.exports = mongoose.model('Standard',standardSchema);
