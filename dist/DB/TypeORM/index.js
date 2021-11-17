"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Config = _interopRequireDefault(require("../../System/Config"));

var _Logger = _interopRequireDefault(require("../../System/Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Class representing a TypeORM handler
 */
class TypeORM {
  static get connection() {
    return TypeORM._connection;
  }
  /**
   * Calls the respective init method
   */


  async init() {
    const engine = _Config.default.string("db.engine", "mysql");

    TypeORM._connection = await this.connect(engine);
  }

  connect(configurationName) {
    const dbConfig = _Config.default.object(`db.${configurationName}`);

    const config = {
      type: dbConfig.engine,
      host: dbConfig.hostname,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: _Config.default.array("db.entities", ["./src/models/**/*.ts"]),
      synchronize: true
    };
    return (0, _typeorm.createConnection)(config).then(connection => {
      _Logger.default.info("TypeORM database connected.");

      return connection;
    }).catch(error => {
      _Logger.default.error(`TypeORM connection error: ${error}`);

      return error;
    });
  }

}

exports.default = TypeORM;

_defineProperty(TypeORM, "_connection", null);