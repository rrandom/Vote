'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollsSchema = new Schema({
  user_name: String,
  poll_name: String,
  poll_options: [String],
  poll_results: [Number],
  active: Boolean
});

module.exports = mongoose.model('Polls', PollsSchema);
