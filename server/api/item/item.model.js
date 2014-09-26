'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  title: String,
  price: Number,
  image: String,
  active: Boolean
});

module.exports = mongoose.model('Item', ItemSchema);
