'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireWildcard(_mongoose);

var userSchema = new _mongoose2['default'].Schema({
  name: { type: String, lowercase: true, unique: true },
  group: { type: String, 'default': '' }
});

exports['default'] = _mongoose2['default'].model('usergroup', userSchema);
module.exports = exports['default'];