var mongoose = require("mongoose"),
    schema = mongoose.schema;

var schema = new mongoose.Schema({
    name: 'string',
    phone: 'string',
    gender: 'String'
})

mongoose.model('Contact', schema, "complexContact");
