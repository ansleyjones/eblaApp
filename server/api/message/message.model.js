'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  pingItems: [],
  recReq: String,
  subject: String,
  message: String,
  accepted: String,
  active: Boolean
});

module.exports = mongoose.model('Message', MessageSchema);
