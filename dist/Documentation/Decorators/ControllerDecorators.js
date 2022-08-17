"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = Controller;
exports.Description = Description;
exports.Name = Name;

var _MetadataStore = _interopRequireDefault(require("../MetadataStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Controller(name, description) {
  return function (BaseClass) {
    _MetadataStore.default.instance.route.setName(BaseClass.name, name);

    _MetadataStore.default.instance.route.setDescription(BaseClass.name, description);

    return BaseClass;
  };
}

function Name(name) {
  return function (BaseClass) {
    _MetadataStore.default.instance.route.setName(BaseClass.name, name);

    return BaseClass;
  };
}

function Description(description) {
  return function (BaseClass) {
    _MetadataStore.default.instance.route.setDescription(BaseClass.name, description);

    return BaseClass;
  };
}