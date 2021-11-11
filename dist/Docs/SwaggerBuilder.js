"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _App = _interopRequireDefault(require("../App"));

var _HTTPStatus = _interopRequireDefault(require("../HTTP/HTTPStatus"));

var _Config = _interopRequireDefault(require("../System/Config"));

var _DocsInterfaces = require("./DocsInterfaces");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SwaggerBuilder {
  constructor(routes, interfaces) {
    _defineProperty(this, "_routes", {});

    _defineProperty(this, "_interfaces", {});

    this._routes = routes;
    this._interfaces = interfaces;
  }

  getYaml() {
    return _jsYaml.default.dump({
      openapi: "3.0.0",
      info: {
        version: _App.default.app.appVersion,
        title: `${_App.default.app.appName} API`,
        description: _App.default.app.appDescription
      },
      servers: [{
        url: _Config.default.string("http.url"),
        description: "Default environment"
      }],
      paths: this.getPaths(),
      components: this.getComponents(),
      tags: this.getTags()
    }, {
      forceQuotes: true
    });
  }

  getComponents() {
    const base = {
      securitySchemes: {
        BasicAuth: {
          type: "http",
          scheme: "basic"
        },
        BearerAuth: {
          type: "http",
          scheme: "bearer"
        }
      },
      schemas: {
        ErrorMessage: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              default: 500
            },
            message: {
              type: "string"
            },
            details: {
              type: "string",
              default: ""
            }
          }
        }
      }
    };
    base.schemas = _objectSpread(_objectSpread({}, base.schemas), Object.keys(this._interfaces).reduce((accum, key) => {
      const value = this._interfaces[key];
      const requiredFields = value.properties.filter(property => property.required);
      return _objectSpread(_objectSpread({}, accum), {}, {
        [key]: {
          type: "object",
          properties: value.properties.reduce((accum, property) => _objectSpread(_objectSpread({}, accum), {}, {
            [property.name]: _objectSpread(_objectSpread({}, property), {}, {
              name: undefined,
              required: undefined
            })
          }), {}),
          required: requiredFields.length > 0 ? requiredFields.map(property => property.name) : undefined
        }
      });
    }, {}));
    return base;
  }

  getTags() {
    const routesList = Object.values(this._routes).map(route => ({
      name: route.name,
      description: route.description || ""
    }));

    if (routesList.length === 0) {
      return {};
    }

    return routesList.map(routeDefinition => ({
      name: routeDefinition.name,
      description: routeDefinition.description || ""
    }));
  }

  getPaths() {
    const routesList = Object.values(this._routes).reduce((accum, routeDefinition) => [...accum, ...routeDefinition.routes.map(route => _objectSpread({
      tag: routeDefinition.name
    }, route))], []);

    if (routesList.length === 0) {
      return {};
    }

    const routeMapping = routesList.reduce((accum, route) => {
      const routeGroup = accum[route.path] || {};
      routeGroup[route.verb] = route;
      return _objectSpread(_objectSpread({}, accum), {}, {
        [route.path]: routeGroup
      });
    }, {});
    return Object.keys(routeMapping).reduce((accum, key) => _objectSpread(_objectSpread({}, accum), {}, {
      [key]: this._displayRouteGroup(Object.values(routeMapping[key]))
    }), {});
  }

  _displayRouteGroup(routeGroup) {
    return routeGroup.reduce((accum, routeDefinition) => {
      const definition = {
        summary: "",
        description: "",
        tags: [routeDefinition.tag]
      };

      if (routeDefinition.isAuthenticated) {
        definition.security = [{
          [routeDefinition.basicSpecific ? "BasicAuth" : "BearerAuth"]: []
        }];
      }

      const parameters = this._getParameters(routeDefinition);

      if (parameters) {
        definition.parameters = parameters;
      }

      definition.operationId = `${routeDefinition.controllerName}.${routeDefinition.methodName}`;
      definition.summary = `${routeDefinition.controllerName}.${routeDefinition.methodName}`;
      definition.responses = this._getDefaultResponse(routeDefinition);

      const requestBody = this._getRequestBody(routeDefinition);

      if (requestBody) {
        definition.requestBody = requestBody;
      }

      return _objectSpread(_objectSpread({}, accum), {}, {
        [routeDefinition.verb]: definition
      });
    }, {});
  }

  _getParameters(routeDefinition) {
    const parameters = Object.values(routeDefinition.parameters);

    if (parameters.length === 0) {
      return null;
    }

    return parameters.map(parameter => ({
      name: parameter.name,
      in: "path",
      description: parameter.description || '""',
      required: true,
      schema: {
        type: parameter.type
      }
    }));
  }

  _getErrors(routeDefinition) {
    if (Object.keys(routeDefinition.errors).length === 0) {
      return {};
    }

    return Object.keys(routeDefinition.errors).reduce((accum, key) => _objectSpread(_objectSpread({}, accum), {}, {
      [key]: {
        description: routeDefinition.errors[key],
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorMessage"
            },
            example: {
              status: key,
              message: routeDefinition.errors[key]
            }
          }
        }
      }
    }), {});
  }

  _getDefaultResponse(routeDefinition) {
    let defaultResponse = _HTTPStatus.default.OK;
    let description = "OK";

    if (routeDefinition.responseStatus) {
      switch (routeDefinition.responseStatus.toString()) {
        case _HTTPStatus.default.NO_CONTENT.toString():
          description = "No Content";
          break;

        case _HTTPStatus.default.CREATED.toString():
          description = "Created";
          break;

        case _HTTPStatus.default.ACCEPTED.toString():
          description = "Accepted";
          break;
      }

      defaultResponse = routeDefinition.responseStatus;
    }

    return _objectSpread(_objectSpread({
      [defaultResponse]: {
        description
      }
    }, this._getErrors(routeDefinition)), {}, {
      500: {
        description: "General server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorMessage"
            }
          }
        }
      }
    });
  }

  _getRequestBody(routeDefinition) {
    if (!routeDefinition.request || Object.keys(routeDefinition.request).length === 0) {
      return null;
    }

    const base = {
      description: '""',
      required: true
    };
    const defaultTag = routeDefinition.request[_DocsInterfaces.DEFAULT_BODY_TAG];

    if (defaultTag) {
      base.content = {
        "application/json": {
          schema: {
            $ref: `#/components/schemas/${defaultTag.schema}`
          }
        }
      };

      if (!this._interfaces[defaultTag.schema]) {
        this._interfaces[defaultTag.schema] = {
          name: defaultTag.schema,
          type: _DocsInterfaces.BodyParameterType.OBJECT,
          properties: []
        };
      }

      return base;
    }

    const requiredFields = Object.keys(routeDefinition.request).filter(key => routeDefinition.request[key].required);
    base.content = {
      "application/json": {
        schema: {
          type: _DocsInterfaces.BodyParameterType.OBJECT,
          properties: Object.keys(routeDefinition.request).reduce((accum, key) => {
            const value = routeDefinition.request[key];
            return _objectSpread(_objectSpread({}, accum), {}, {
              [key]: {
                type: value.type,
                default: value.default,
                description: value.description
              }
            });
          }, {}),
          required: requiredFields.length > 0 ? requiredFields.map(key => routeDefinition.request[key].name) : undefined
        }
      }
    };
    return base;
  }

}

exports.default = SwaggerBuilder;