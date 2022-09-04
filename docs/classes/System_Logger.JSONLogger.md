[Spark OneBE - v1.0.30](../README.md) / [Exports](../modules.md) / [System/Logger](../modules/System_Logger.md) / JSONLogger

# Class: JSONLogger

[System/Logger](../modules/System_Logger.md).JSONLogger

Logger that can be used to log information in JSON objects. This
logger can be used when logging information into AWS, Elastic Search.

## Hierarchy

- [`Logger`](System_Logger.Logger.md)

  ↳ **`JSONLogger`**

## Table of contents

### Constructors

- [constructor](System_Logger.JSONLogger.md#constructor)

### Properties

- [\_log](System_Logger.JSONLogger.md#_log)

### Accessors

- [log](System_Logger.JSONLogger.md#log)

### Methods

- [debug](System_Logger.JSONLogger.md#debug)
- [error](System_Logger.JSONLogger.md#error)
- [info](System_Logger.JSONLogger.md#info)
- [silly](System_Logger.JSONLogger.md#silly)
- [verbose](System_Logger.JSONLogger.md#verbose)
- [warn](System_Logger.JSONLogger.md#warn)

## Constructors

### constructor

• **new JSONLogger**(`logLevel`, `isFile?`, `options?`)

The constructor of the logger class.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `logLevel` | [`LogLevel`](../enums/System_LogLevel.LogLevel.md) | `undefined` | The level of logging we will use in our application. |
| `isFile` | `boolean` | `false` | If the logger should log the messages in a file. |
| `options?` | `FileTransportOptions` | `undefined` | The options passed to the file logger transport. |

#### Overrides

[Logger](System_Logger.Logger.md).[constructor](System_Logger.Logger.md#constructor)

## Properties

### \_log

• `Protected` **\_log**: `Logger`

The logger object the application will use for logging.

#### Inherited from

[Logger](System_Logger.Logger.md).[_log](System_Logger.Logger.md#_log)

## Accessors

### log

• `get` **log**(): `Logger`

Getter for the logger object.

#### Returns

`Logger`

#### Inherited from

Logger.log

## Methods

### debug

▸ **debug**(`message`, ...`meta`): `Logger`

Method to log a debug message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | The message to be logged. |
| `...meta` | `any`[] | Various other meta elements passed to the log method. |

#### Returns

`Logger`

#### Inherited from

[Logger](System_Logger.Logger.md).[debug](System_Logger.Logger.md#debug)

___

### error

▸ **error**(`message`, ...`meta`): `Logger`

Method to log an error message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | The message to be logged. |
| `...meta` | `any`[] | Various other meta elements passed to the log method. |

#### Returns

`Logger`

#### Inherited from

[Logger](System_Logger.Logger.md).[error](System_Logger.Logger.md#error)

___

### info

▸ **info**(`message`, ...`meta`): `Logger`

Method to log an information message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | The message to be logged. |
| `...meta` | `any`[] | Various other meta elements passed to the log method. |

#### Returns

`Logger`

#### Inherited from

[Logger](System_Logger.Logger.md).[info](System_Logger.Logger.md#info)

___

### silly

▸ **silly**(`message`, ...`meta`): `Logger`

Method to log a silly message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | The message to be logged. |
| `...meta` | `any`[] | Various other meta elements passed to the log method. |

#### Returns

`Logger`

#### Inherited from

[Logger](System_Logger.Logger.md).[silly](System_Logger.Logger.md#silly)

___

### verbose

▸ **verbose**(`message`, ...`meta`): `Logger`

Method to log a verbose message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | The message to be logged. |
| `...meta` | `any`[] | Various other meta elements passed to the log method. |

#### Returns

`Logger`

#### Inherited from

[Logger](System_Logger.Logger.md).[verbose](System_Logger.Logger.md#verbose)

___

### warn

▸ **warn**(`message`, ...`meta`): `Logger`

Method to log a warning message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | The message to be logged. |
| `...meta` | `any`[] | Various other meta elements passed to the log method. |

#### Returns

`Logger`

#### Inherited from

[Logger](System_Logger.Logger.md).[warn](System_Logger.Logger.md#warn)