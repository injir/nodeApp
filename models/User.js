var mongoose = require('../db');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type:String,
    required:true
  } ,
  login: {
    type:String,
    unique:true,
    required:true
  },
  hashed_password:  {
    type:String,
    required:true
  },
  email: {
    type:String,
    unique:true,
    required:true
  },
  role: {
    type:String,
  },
  created:{
    type: Date,
    default: Date.now
  },
  salt:{
    type:String,
    required:true
  }
});
schema.methods.encryptPassword = function(password){
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};
var virtual = schema.virtual('password');


virtual.set(function(password){
  this._plainPassword = password;
  this.salt = Math.random()+'';
  this.hashed_password = this.encryptPassword(password);
});
virtual.get(function(){
  return this._plainPassword;
});
schema.methods.checkPassword= function(password){
  return this.encryptPassword(password) == this.hashed_password;
}
var Model = mongoose.model('User', schema);


var item = new Model({name:'injir',login:'injir',password:'123',email:'injir@ya.ru',role:'admin'});
item.save();

module.exports = Model;