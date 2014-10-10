'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User'},
  firstName: String,
  lastName: String,
  image: String,
  trade: [],
  location: {
    city: String,
    state: String
  },
  address: String,
  zip: Number,
  phone: String,
  about: String,
  active: Boolean
});

module.exports = mongoose.model('Profile', ProfileSchema);
