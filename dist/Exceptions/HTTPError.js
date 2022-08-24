"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HTTPStatus = _interopRequireDefault(require("../HTTP/HTTPStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A Generic Error with HTTP Status Code that can be thrown from your application.
 *
 * Using the HTTPError class you can easily specify the HTTP Status Code of the response
 * when the error is triggered.
 */
class HTTPError extends Error {
  /**
   * The HTTP Status code of the error.
   */

  /**
   * The additional parameters sent to the exception.
   */

  /**
   * Constructor of the Generic HTTP Error.
   *
   * @param message The message of the exception.
   * @param status The status code of the exception.
   * @param parameters Some extra parameters sent to the error.
   */
  constructor(message, status = _HTTPStatus.default.SERVER_ERROR, parameters) {
    super(message);

    _defineProperty(this, "status", _HTTPStatus.default.SERVER_ERROR);

    _defineProperty(this, "parameters", null);

    this.status = status;
    this.parameters = parameters;
  }

}

exports.default = HTTPError;