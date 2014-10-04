'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  sender: { type: Schema.ObjectId, ref: 'Ping' },
  recipient: { type: Schema.ObjectId, ref: 'Ping' },
  subject: String,
  message: String,
  read: Boolean,
  active: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);
