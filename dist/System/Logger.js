"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Logger = exports.FileLogger = exports.ConsoleLogger = void 0;
exports.setDefaultLogger = setDefaultLogger;

var _path = _interopRequireDefault(require("path"));

var _winston = _interopRequireDefault(require("winston"));

var _Config = _interopRequireDefault(require("./Config"));

var _LogLevel = _interopRequireDefault(require("./LogLevel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The base logger class.
 */
class Logger {
  /**
   * The logger object we will use for logging.
   */

  /**
   * The constructor of the logger class.
   *
   * @param logLevel The level of logging we will use in our application.
   * @param transport The transport used for the winston logger.
   */
  constructor(logLevel, transport) {
    _defineProperty(this, "_log", void 0);

    this._log = _winston.default.createLogger({
      level: logLevel.toString() || _LogLevel.default.INFO,
      format: _winston.default.format.simple(),
      transports: [transport]
    });
  }
  /**
   * Getter for the logger object.
   */


  get log() {
    return this._log;
  }
  /**
   * Method to log a info message.
   *
   * @param message The message to be logged.
   * @param meta Various other meta elements passed to the log method.
   */


  info(message, ...meta) {
    return this.log.info(message, ...meta);
  }
  /**
   * Method to log a error message.
   *
   * @param message The message to be logged.
   * @param meta Various other meta elements passed to the log method.
   */


  error(message, ...meta) {
    return this.log.error(message, ...meta);
  }
  /**
   * Method to log a warn message.
   *
   * @param message The message to be logged.
   * @param meta Various other meta elements passed to the log method.
   */


  warn(message, ...meta) {
    return this.log.warn(message, ...meta);
  }
  /**
   * Method to log a debug message.
   *
   * @param message The message to be logged.
   * @param meta Various other meta elements passed to the log method.
   */


  debug(message, ...meta) {
    return this.log.debug(message, ...meta);
  }
  /**
   * Method to log a verbose message.
   *
   * @param message The message to be logged.
   * @param meta Various other meta elements passed to the log method.
   */


  verbose(message, ...meta) {
    return this.log.verbose(message, ...meta);
  }
  /**
   * Method to log a silly message.
   *
   * @param message The message to be logged.
   * @param meta Various other meta elements passed to the log method.
   */


  silly(message, ...meta) {
    return this.log.silly(message, ...meta);
  }

}
/**
 * The console logger that can be used in our application.
 */


exports.Logger = Logger;

class ConsoleLogger extends Logger {
  /**
   * The constructor of the logger class.
   *
   * @param logLevel The level of logging we will use in our application.
   */
  constructor(logLevel) {
    super(logLevel, new _winston.default.transports.Console());
  }

}
/**
 * The file logger that can be used in our application.
 */


exports.ConsoleLogger = ConsoleLogger;

class FileLogger extends Logger {
  /**
   * The constructor of the logger class.
   *
   * @param logLevel The level of logging we will use in our application.
   * @param options The options passed to the file logger transport.
   */
  constructor(logLevel, options) {
    super(logLevel, new _winston.default.transports.File(_objectSpread({
      filename: _Config.default.string("logs.filename", "app.log"),
      dirname: _Config.default.string("logs.folder", _path.default.join(process.cwd(), "storage", "logs"))
    }, options || {})));
  }

}
/**
 * The default logger of the application.
 */


exports.FileLogger = FileLogger;
let DefaultLogger = new ConsoleLogger(_LogLevel.default[_Config.default.string("logs.level", _LogLevel.default.INFO).toUpperCase()]);
/**
 * Function used to change the default logger of the application.
 *
 * @param newLogger The new logger instance.
 */

function setDefaultLogger(newLogger) {
  DefaultLogger = newLogger;
}

var _default = DefaultLogger;
exports.default = _default;