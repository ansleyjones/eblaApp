'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// var User = require('../user/user.model');

var ProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  trade: String,
  info: String,
  available: Boolean,
  city: String,
  state: String,
  active: Boolean
});

ProfileSchema
  .statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name email').exec(cb);
};
module.exports = mongoose.model('Profile', ProfileSchema);
