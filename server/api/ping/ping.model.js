'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PingSchema = new Schema({
  sender: { type: Schema.ObjectId, ref: 'Profile' },
  recipient: { type: Schema.ObjectId, ref: 'Profile' },
  item: { type: Schema.ObjectId, ref: 'Item' },
  date: String,
  read: Boolean
});

module.exports = mongoose.model('Ping', PingSchema);
