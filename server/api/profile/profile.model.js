'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  firstName: String,
  lastName: String,
  trade: String,
  location: {
    city: String,
    state: String
  },
  about: String,
  tradeStat: Boolean,
  friends: [],
  active: Boolean
});

module.exports = mongoose.model('Profile', ProfileSchema);
