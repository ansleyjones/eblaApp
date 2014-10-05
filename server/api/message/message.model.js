'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  pingItems: [],
  subject: String,
  message: String,
  read: Boolean,
  active: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);
