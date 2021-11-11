import jsYaml from "js-yaml";
import app from "../App";
import HTTPStatus from "../HTTP/HTTPStatus";
import Config from "../System/Config";
import {
  BodyParameterType,
  DEFAULT_BODY_TAG,
  IInterfaceDoc,
  IRouteDoc,
  TRoutesList,
} from "./DocsInterfaces";

export default class SwaggerBuilder {
  protected _routes: TRoutesList = {};
  protected _interfaces: Record<string, IInterfaceDoc> = {};

  public constructor(
    routes: TRoutesList,
    interfaces: Record<string, IInterfaceDoc>
  ) {
    this._routes = routes;
    this._interfaces = interfaces;
  }

  public getYaml(): string {
    return jsYaml.dump(
      {
        openapi: "3.0.0",
        info: {
          version: app.app.appVersion,
          title: `${ app.app.appName } API`,
          description: app.app.appDescription,
        },
        servers: [
          {
            url: Config.string("http.url"),
            description: "Default environment",
          },
        ],
        paths: this.getPaths(),
        components: this.getComponents(),
        tags: this.getTags(),
      },
      { forceQuotes: true }
    );
  }

  private getComponents(): Record<string, any> {
    const base = {
      securitySchemes: {
        BasicAuth: {
          type: "http",
          scheme: "basic",
        },
        BearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
      schemas: {
        ErrorMessage: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              default: 500,
            },
            message: {
              type: "string",
            },
            details: {
              type: "string",
              default: "",
            },
          },
        },
      },
    };

    base.schemas = {
      ...base.schemas,
      ...Object.keys(this._interfaces).reduce((accum, key) => {
        const value = this._interfaces[key];
        const requiredFields = value.properties.filter(
          (property) => property.required
        );
        return {
          ...accum,
          [key]: {
            type: "object",
            properties: value.properties.reduce(
              (accum, property) => ({
                ...accum,
                [property.name]: {
                  ...property,
                  name: undefined,
                  required: undefined,
                },
              }),
              {}
            ),
            required:
              requiredFields.length > 0
                ? requiredFields.map((property) => property.name)
                : undefined,
          },
        };
      }, {}),
    };

    return base;
  }

  private getTags(): Record<string, any> {
    const routesList = Object.values(this._routes).map((route) => ({
      name: route.name,
      description: route.description || "",
    }));

    if (routesList.length === 0) {
      return {};
    }

    return routesList.map((routeDefinition) => ({
      name: routeDefinition.name,
      description: routeDefinition.description || "",
    }));
  }

  private getPaths(): Record<string, any> {
    const routesList = Object.values(this._routes).reduce(
      (accum, routeDefinition) => [
        ...accum,
        ...routeDefinition.routes.map((route) => ({
          tag: routeDefinition.name,
          ...route,
        })),
      ],
      []
    );

    if (routesList.length === 0) {
      return {};
    }

    const routeMapping = routesList.reduce((accum, route: IRouteDoc) => {
      const routeGroup = accum[route.path] || {};

      routeGroup[route.verb] = route;

      return {
        ...accum,
        [route.path]: routeGroup,
      };
    }, {});

    return Object.keys(routeMapping).reduce(
      (accum, key) => ({
        ...accum,
        [key]: this._displayRouteGroup(Object.values(routeMapping[key])),
      }),
      {}
    );
  }

  private _displayRouteGroup(
    routeGroup: Array<IRouteDoc>
  ): Record<string, any> {
    return routeGroup.reduce((accum, routeDefinition: IRouteDoc) => {
      const definition: Record<string, any> = {
        summary: "",
        description: "",
        tags: [ routeDefinition.tag ],
      };

      if (routeDefinition.isAuthenticated) {
        definition.security = [
          { [routeDefinition.basicSpecific ? "BasicAuth" : "BearerAuth"]: [] },
        ];
      }

      const parameters = this._getParameters(routeDefinition);
      if (parameters) {
        definition.parameters = parameters;
      }

      definition.operationId = `${ routeDefinition.controllerName }.${ routeDefinition.methodName }`;
      definition.summary = `${ routeDefinition.controllerName }.${ routeDefinition.methodName }`;
      definition.responses = this._getDefaultResponse(routeDefinition);

      const requestBody = this._getRequestBody(routeDefinition);
      if (requestBody) {
        definition.requestBody = requestBody;
      }
      return { ...accum, [routeDefinition.verb]: definition };
    }, {});
  }

  private _getParameters(routeDefinition: IRouteDoc): Record<string, any> {
    const parameters = Object.values(routeDefinition.parameters);
    if (parameters.length === 0) {
      return null;
    }

    return parameters.map((parameter) => ({
      name: parameter.name,
      in: "path",
      description: parameter.description || '""',
      required: true,
      schema: {
        type: parameter.type,
      },
    }));
  }

  private _getErrors(routeDefinition: IRouteDoc): Record<string, any> {
    if (Object.keys(routeDefinition.errors).length === 0) {
      return {};
    }

    return Object.keys(routeDefinition.errors).reduce(
      (accum, key) => ({
        ...accum,
        [key]: {
          description: routeDefinition.errors[key],
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorMessage",
              },
              example: {
                status: key,
                message: routeDefinition.errors[key],
              },
            },
          },
        },
      }),
      {}
    );
  }

  private _getDefaultResponse(routeDefinition: IRouteDoc): Record<string, any> {
    let defaultResponse = HTTPStatus.OK;
    let description = "OK";

    if (routeDefinition.responseStatus) {
      switch (routeDefinition.responseStatus.toString()) {
        case HTTPStatus.NO_CONTENT.toString():
          description = "No Content";
          break;
        case HTTPStatus.CREATED.toString():
          description = "Created";
          break;
        case HTTPStatus.ACCEPTED.toString():
          description = "Accepted";
          break;
      }
      defaultResponse = routeDefinition.responseStatus;
    }

    return {
      [defaultResponse]: {
        description,
      },
      ...this._getErrors(routeDefinition),
      500: {
        description: "General server error",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ErrorMessage",
            },
          },
        },
      },
    };
  }

  private _getRequestBody(routeDefinition: IRouteDoc): Record<string, any> {
    if (
      !routeDefinition.request ||
      Object.keys(routeDefinition.request).length === 0
    ) {
      return null;
    }
    const base: Record<string, any> = {
      description: '""',
      required: true,
    };

    const defaultTag = routeDefinition.request[DEFAULT_BODY_TAG];
    if (defaultTag) {
      base.content = {
        "application/json": {
          schema: {
            $ref: `#/components/schemas/${ defaultTag.schema }`,
          },
        },
      };

      if (!this._interfaces[defaultTag.schema]) {
        this._interfaces[defaultTag.schema] = {
          name: defaultTag.schema,
          type: BodyParameterType.OBJECT,
          properties: [],
        };
      }
      return base;
    }

    const requiredFields = Object.keys(routeDefinition.request).filter(
      (key) => routeDefinition.request[key].required
    );

    base.content = {
      "application/json": {
        schema: {
          type: BodyParameterType.OBJECT,
          properties: Object.keys(routeDefinition.request).reduce(
            (accum, key) => {
              const value = routeDefinition.request[key];

              return {
                ...accum,
                [key]: {
                  type: value.type,
                  default: value.default,
                  description: value.description,
                },
              };
            },
            {}
          ),
          required:
            requiredFields.length > 0
              ? requiredFields.map((key) => routeDefinition.request[key].name)
              : undefined,
        },
      },
    };

    return base;
  }
}