'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  profile: { type: Schema.ObjectId, ref: 'Profile' },
  title: String,
  price: Number,
  likes: Number,
  image: String,
  tradeStat: Boolean,
  active: Boolean
});

module.exports = mongoose.model('Item', ItemSchema);
