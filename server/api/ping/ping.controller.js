'use strict';

var _ = require('lodash');
var Ping = require('./ping.model');

// Get list of pings
exports.index = function(req, res) {
  Ping.find()
  .populate('sender')
  .populate('recipient')
  .populate('item')
  .exec(function (err, pings) {
    if(err) { return handleError(res, err); }
    return res.json(200, pings);
  });
};

// Get a single ping
exports.show = function(req, res) {
  Ping.findById(req.params.id, function (err, ping) {
    if(err) { return handleError(res, err); }
    if(!ping) { return res.send(404); }
    return res.json(ping);
  });
};

// Creates a new ping in the DB.
exports.create = function(req, res) {
  Ping.create(req.body, function(err, ping) {
    if(err) { return handleError(res, err); }
    return res.json(201, ping);
  });
};

// Updates an existing ping in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Ping.findById(req.params.id, function (err, ping) {
//     if (err) { return handleError(res, err); }
//     if(!ping) { return res.send(404); }
//     var updated = _.merge(ping, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, ping);
//     });
//   });
// };

exports.update = function(req, res) {
  var pingId = req.body._id;
  req.body.sender = req.body.sender._id;
  req.body.recipient = req.body.recipient._id;
  req.body.item = req.body.item._id;
  delete req.body._id;
  Ping.update({_id:pingId}, req.body, function(err, ping){
    if(err) {return handleError(res, err); }
    res.status(200).json(ping);
  });
};

// Deletes a ping from the DB.
exports.destroy = function(req, res) {
  Ping.findById(req.params.id, function (err, ping) {
    if(err) { return handleError(res, err); }
    if(!ping) { return res.send(404); }
    ping.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
