"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initPassportStrategy;
Object.defineProperty(exports, "passport", {
  enumerable: true,
  get: function () {
    return _passport.default;
  }
});

var _passport = _interopRequireDefault(require("passport"));

var _passportHttp = require("passport-http");

var _passportJwt = require("passport-jwt");

var _Config = _interopRequireDefault(require("../System/Config"));

var _JWT = require("./JWT");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Function used to initialise the passport strategies that are used in the application.
 *
 * This function will perform some initialisation calls for the serialization and
 * deserialization of the User object based on the Payload object. Also, it initialises
 * all the authentication methods exposed by the framework: bearer and basic.
 *
 * @param props The properties used to initialise the passport strategies.
 */
function initPassportStrategy(props) {
  _passport.default.serializeUser((user, done) => {
    done(null, "serializeUser" in props ? props.serializeUser(user) : {
      userId: user.id
    });
  });

  _passport.default.deserializeUser("deserializeUser" in props ? props.deserializeUser : (payload, done) => {
    done(null, _objectSpread({
      id: payload.userId
    }, payload));
  });

  _passport.default.use("bearer", new _passportJwt.Strategy({
    secretOrKey: _Config.default.string("auth.jwt.secret"),
    issuer: _Config.default.string("auth.jwt.issuer", "onebe.sprk.dev"),
    audience: _Config.default.string("auth.jwt.audience", "onebe.sprk.dev"),
    jwtFromRequest: _JWT.extractToken,
    ignoreExpiration: false
  }, "deserializeUser" in props ? props.deserializeUser : (payload, done) => {
    done(null, _objectSpread({
      id: payload.userId
    }, payload));
  }));

  _passport.default.use("basic", new _passportHttp.BasicStrategy("basicAuth" in props ? props.basicAuth : (username, password, done) => {
    done(null, {
      id: username
    });
  }));
}
/**
 * Since we want to use only one passport instance throughout the application,
 * we export the passport instance used in the framework. To learn more about
 * this, go to: https://www.passportjs.org/. If you need additional authentication
 * methods, please create a new issue in GitHub.
 *
 * @link https://www.passportjs.org/
 */