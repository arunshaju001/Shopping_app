var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var order = new Schema({
  name: {type:String,required:true},
  email:{ type:String,required:true, unique:true},
  address : {type:String,required:true},
  order : {type:String,required:true},
  date : {type:Date,required:true, default: new Date()},
  status :{type:String,required:true, default: 'In Progress'}

});


var OrderModel = mongoose.model('OrderModel', order);

module.exports = OrderModel