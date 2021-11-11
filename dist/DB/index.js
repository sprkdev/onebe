"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Config = _interopRequireDefault(require("../System/Config"));

var _Mongo = _interopRequireDefault(require("./Mongo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns initialized Mongo object
 * */
function _default() {
  switch (_Config.default.string("db.engine", "mongo")) {
    case "mongo":
      return new _Mongo.default().init();
  }
}