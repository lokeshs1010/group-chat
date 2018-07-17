'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: 'randompassword'
  },
  email: {
    type: String,
    default: ''
  },
  hash:{
    type:String,
    default:'randomhash'
 },
  mobileNumber: {
    type: Number,
    default: 0
  },
  verified:{
    type:Boolean,
    default:false
  },
  createdOn :{
    type:Date,
    default:""
  }


})


mongoose.model('User', userSchema);