'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  sender: { type: Schema.ObjectId, ref: 'User' },
  recipient: { type: Schema.ObjectId, ref: 'User' },
  me: { type: Schema.ObjectId, ref: 'Profile' },
  subject: String,
  content: String,
  read: Boolean,
  active: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);
