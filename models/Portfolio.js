var mongoose = require('../db');

var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:  String,
  img: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
var Portfolio = mongoose.model('Portfolio', blogSchema);
var item = new Portfolio({title:'firstProject',author:'injir'});
Portfolio.findOne({title:'firstProject'}).exec(function(err,doc){
  if(err){
   throw err;
  }
  if(doc == null){
    item.save(function (err) {
      if(err){
    console.log('Что то пошло не так: '+err);
  }
  }
  );
  }
});
module.exports = Portfolio;