var mongoose = require('../db');

var Schema = mongoose.Schema;

var modelSchema = new Schema({
  title:  String,
  author: String,
  body:  String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

var Model = mongoose.model('Feedback',  modelSchema);
module.exports = Model;