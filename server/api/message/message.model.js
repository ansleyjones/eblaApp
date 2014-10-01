'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  sender: { type: Schema.ObjectId, ref: 'Profile' },
  recipient: { type: Schema.ObjectId, ref: 'Profile' },
  item: { type: Schema.ObjectId, ref: 'Item' },
  subject: String,
  content: String,
  read: Boolean,
  active: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);
