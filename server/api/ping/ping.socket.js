/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Ping = require('./ping.model');

exports.register = function(socket) {
  Ping.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Ping.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ping:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ping:remove', doc);
}