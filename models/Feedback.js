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
var item = new Model({title:'Feeds',author:'injir',body:'123123123'});
Model.findOne({title:'Feeds'}).exec(function(err,doc){
  if(err){
   throw err;
  }
  if(doc == null){
     item.save(function (err) {
      if(err){
    console.log('Что то пошло не так: '+err);
        }
  
      });
  }
});

  

module.exports = Model;