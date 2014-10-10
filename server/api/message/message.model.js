'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  sender: { type: Schema.ObjectId, ref: 'Profile' },
  user: { type: Schema.ObjectId, ref: 'User' },
  pingItems: [],
  replies: [],
  recReq: String,
  subject: String,
  message: String,
  accepted: String,
  date: String,
  active: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);
