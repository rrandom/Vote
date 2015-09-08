'use strict';

var _ = require('lodash');
var Polls = require('./polls.model');

// Get list of pollss
exports.index = function(req, res) {
  Polls.find(function (err, pollss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(pollss);
  });
};

// Get a all polls of a user
exports.showAll = function(req, res) {
  Polls.find({_id: req.params.id}, function (err, polls) {
    if(err) { return handleError(res, err); }
    if(!polls) { return res.status(404).send('Not Found'); }
    return res.json(polls);
  });
};

// Show one
exports.showOne = function(req, res) {
  Polls.find({poll_name: req.params.poll}, function(err, polls) {
    if (err) { return handleError(res, err); }
    if (!polls) { return res.status(404).send('Not Found'); }
    return res.json(polls);
  })
};

// Creates a new polls in the DB.
exports.create = function(req, res) {
  Polls.create(req.body, function(err, polls) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(polls);
  });
};

// Updates an existing polls in the DB.
// TO-DO: update option
exports.update = function(req, res) {
  console.log("Called update ");
  console.log('req.params:', req.params);
  if(req.body._id) { delete req.body._id; }
  Polls.findById(req.params.id, function (err, polls) {
    if (err) { return handleError(res, err); }
    if(!polls) { return res.status(404).send('Not Found'); }
    console.log('polls:', polls);
    var updated = _.extend(polls, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(polls);
    });
  });
};

// Deletes a polls from the DB.
exports.destroy = function(req, res) {
  Polls.findById(req.params.id, function (err, polls) {
    if(err) { return handleError(res, err); }
    if(!polls) { return res.status(404).send('Not Found'); }
    polls.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
