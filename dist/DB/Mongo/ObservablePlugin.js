"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observer = void 0;
exports.observerPlugin = observerPlugin;

var _Logger = _interopRequireDefault(require("../../System/Logger"));

var _Observable = _interopRequireDefault(require("./Observable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const observer = new _Observable.default();
exports.observer = observer;

/**
 * Creates an Observer plugin
 * @param name A name for the plugin
 * */
function observerPlugin(name) {
  return (schema, opts) => {
    schema.pre("save", next => {
      const emitAction = `${name}:save:pre`.toLowerCase();

      _Logger.default.debug(`Model: [${name}] emits: [${name}:save:pre]`);

      observer.emit(emitAction);
      next();
    });
    schema.pre("remove", next => {
      const emitAction = `${name}:remove:pre`.toLowerCase();

      _Logger.default.debug(`Model: [${name}] emits: [${name}:remove:pre]`);

      observer.emit(emitAction);
      next();
    });
    schema.post("save", (doc, next) => {
      const emitAction = `${name}:save:post`.toLowerCase();

      _Logger.default.debug(`Model: [${name}] emits: [${name}:save:post]`);

      observer.emit(emitAction, doc);
      next();
    });
    schema.post("remove", (doc, next) => {
      const emitAction = `${name}:remove:post`.toLowerCase();

      _Logger.default.debug(`Model: [${name}] emits: [${name}:remove:post]`);

      observer.emit(emitAction, doc);
      next();
    });
  };
}