'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User'},
  firstName: String,
  lastName: String,
  image: String,
  trade: String,
  location: {
    city: String,
    state: String
  },
  about: String,
  tradeStat: Boolean,
  items: [{ type: Schema.ObjectId, ref: 'Item'}],
  messageBoard: [{ type: Schema.ObjectId, ref: 'Message' }],
  friends: [],
  active: Boolean
});

module.exports = mongoose.model('Profile', ProfileSchema);
