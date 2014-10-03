'use strict';

var _ = require('lodash');
var Profile = require('./profile.model');


// Get list of profiles
exports.index = function(req, res) {
  Profile.find()
    .populate('user', 'name email')
    .exec(function (err, profiles) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(profiles);
  });
};



// Get a single profile
exports.show = function(req, res) {
  var paramId = req.params.id;
  console.log(paramId);
  Profile.findById(req.params.id, function (err, profile) {

    console.log(req.params.id);
    if(err) { return handleError(res, err); }
    if(!profile) { return res.send(404); }
    return res.json(profile);
  });
};


// Creates a new profile in the DB.
exports.create = function(req, res) {
  Profile.create(req.body, function(err, profile) {
    if(err) { return handleError(res, err); }
    return res.json(201, profile);
  });
};

// Updates an existing profile in the DB.
exports.update = function(req, res) {
  var profId = req.body._id;
  req.body.user = req.body.user._id;
  delete req.body._id;
  Profile.update({_id:profId}, req.body, function(err, profile){
    if(err) {return handleError(res, err); }
    res.status(200).json(profile);
  });
};

// Deletes a profile from the DB.
exports.destroy = function(req, res) {
  Profile.findById(req.params.id, function (err, profile) {
    if(err) { return handleError(res, err); }
    if(!profile) { return res.send(404); }
    profile.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
