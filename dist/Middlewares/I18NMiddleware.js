"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextHttpMiddleware = require("i18next-http-middleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Middleware used to enable the Internationalisation (i18n) support for the application endpoints.
 * Since you might want to have the messages translated to the language chosen by the user
 * when the request was made, the i18n support needs to be added to the request object.
 */
class I18nMiddleware {
  /**
   * The middleware initialization method.
   *
   * @param app The express application on which we apply the middleware.
   */
  use(app) {
    app.use((0, _i18nextHttpMiddleware.handle)(_i18next.default));
  }

}

exports.default = I18nMiddleware;