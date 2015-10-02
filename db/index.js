var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dize');
module.exports = mongoose;