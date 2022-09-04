[Spark OneBE - v1.0.30](../README.md) / [Exports](../modules.md) / [Services/ServiceReadRepository](../modules/Services_ServiceReadRepository.md) / ServiceReadRepository

# Class: ServiceReadRepository<Entity, KeyType\>

[Services/ServiceReadRepository](../modules/Services_ServiceReadRepository.md).ServiceReadRepository

The base class for your services that are using a database table.

We recommend using a service with repository attached to perform all the actions in your application
that need working with a database.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Entity` | extends `ObjectLiteral` |
| `KeyType` | `number` |

## Hierarchy

- [`ServiceWithRepository`](Services_ServiceWithRepository.ServiceWithRepository.md)<`Entity`\>

  ↳ **`ServiceReadRepository`**

  ↳↳ [`ServiceFullRepository`](Services_ServiceFullRepository.ServiceFullRepository.md)

## Table of contents

### Constructors

- [constructor](Services_ServiceReadRepository.ServiceReadRepository.md#constructor)

### Properties

- [\_dataSource](Services_ServiceReadRepository.ServiceReadRepository.md#_datasource)
- [\_repository](Services_ServiceReadRepository.ServiceReadRepository.md#_repository)
- [primaryKey](Services_ServiceReadRepository.ServiceReadRepository.md#primarykey)

### Accessors

- [dataSource](Services_ServiceReadRepository.ServiceReadRepository.md#datasource)
- [repository](Services_ServiceReadRepository.ServiceReadRepository.md#repository)
- [validator](Services_ServiceReadRepository.ServiceReadRepository.md#validator)

### Methods

- [\_getPaginatedOptions](Services_ServiceReadRepository.ServiceReadRepository.md#_getpaginatedoptions)
- [customValidate](Services_ServiceReadRepository.ServiceReadRepository.md#customvalidate)
- [get](Services_ServiceReadRepository.ServiceReadRepository.md#get)
- [getAll](Services_ServiceReadRepository.ServiceReadRepository.md#getall)
- [getAllPaginated](Services_ServiceReadRepository.ServiceReadRepository.md#getallpaginated)
- [getByKey](Services_ServiceReadRepository.ServiceReadRepository.md#getbykey)
- [validate](Services_ServiceReadRepository.ServiceReadRepository.md#validate)

## Constructors

### constructor

• `Protected` **new ServiceReadRepository**<`Entity`, `KeyType`\>(`entity`, `dataSource?`)

Service constructor.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Entity` | extends `ObjectLiteral` |
| `KeyType` | `number` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entity` | `EntityTarget`<`Entity`\> | The entity for which we want to create the repository. |
| `dataSource?` | `DataSource` | The datasource on which to create the repository. |

#### Inherited from

[ServiceWithRepository](Services_ServiceWithRepository.ServiceWithRepository.md).[constructor](Services_ServiceWithRepository.ServiceWithRepository.md#constructor)

## Properties

### \_dataSource

• `Protected` `Readonly` **\_dataSource**: `DataSource`

The datasource used for the repository.

#### Inherited from

[ServiceWithRepository](Services_ServiceWithRepository.ServiceWithRepository.md).[_dataSource](Services_ServiceWithRepository.ServiceWithRepository.md#_datasource)

___

### \_repository

• `Protected` `Readonly` **\_repository**: `Repository`<`Entity`\>

The repository created by TypeORM for the entity used in the repository.

#### Inherited from

[ServiceWithRepository](Services_ServiceWithRepository.ServiceWithRepository.md).[_repository](Services_ServiceWithRepository.ServiceWithRepository.md#_repository)

___

### primaryKey

• `Protected` **primaryKey**: `string` = `"id"`

The name of the primary key field used to get data by id.

## Accessors

### dataSource

• `get` **dataSource**(): `DataSource`

Getter for the datasource attached to the service.

#### Returns

`DataSource`

#### Inherited from

ServiceWithRepository.dataSource

___

### repository

• `get` **repository**(): `Repository`<`Entity`\>

Getter for the repository attached to the service.

#### Returns

`Repository`<`Entity`\>

#### Inherited from

ServiceWithRepository.repository

___

### validator

• `get` **validator**(): `AnySchema`<`any`\>

Returns the default data validator of the service.

#### Returns

`AnySchema`<`any`\>

#### Inherited from

ServiceWithRepository.validator

• `set` **validator**(`newValidator`): `void`

Sets the validator value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newValidator` | `AnySchema`<`any`\> | The new validator to be set. |

#### Returns

`void`

#### Inherited from

ServiceWithRepository.validator

## Methods

### \_getPaginatedOptions

▸ `Protected` **_getPaginatedOptions**(`paginatedOptions`): [`PaginatedOptions`](Services_PaginationDefinition.PaginatedOptions.md)<`Entity`\>

Method used to get the pagination information from the pagination options
sent by the user.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paginatedOptions` | [`PaginatedOptions`](Services_PaginationDefinition.PaginatedOptions.md)<`Entity`\> | The pagination options. |

#### Returns

[`PaginatedOptions`](Services_PaginationDefinition.PaginatedOptions.md)<`Entity`\>

___

### customValidate

▸ `Protected` **customValidate**<`T`\>(`data`, `validator`): `T`

Validates the given data against a given validator and returns
the data after applying the validator on it.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `T` | The data to be validated. |
| `validator` | `AnySchema`<`any`\> | The validator to be used. |

#### Returns

`T`

#### Inherited from

[ServiceWithRepository](Services_ServiceWithRepository.ServiceWithRepository.md).[customValidate](Services_ServiceWithRepository.ServiceWithRepository.md#customvalidate)

___

### get

▸ **get**(`where`, `options?`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`Entity`\>

Method used to get a single element, based on the filters sent
as parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `where` | `FindOptionsWhere`<`Entity`\> | The where clause to be used to fetch the data. |
| `options?` | `FindOneOptions`<`Entity`\> | Extra options to be used for finding the data. |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`Entity`\>

___

### getAll

▸ **getAll**(`options?`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`Entity`[]\>

Method used to get all the data from the repository, based on the
filters sent as parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `FindManyOptions`<`Entity`\> | A list with options to be used when getting the data. |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`Entity`[]\>

___

### getAllPaginated

▸ **getAllPaginated**(`paginatedOptions`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<[`PaginatedEntity`](Services_PaginationDefinition.PaginatedEntity.md)<`Entity`\>\>

Method used to get the paginated data from the repository, based on the
filters sent as parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paginatedOptions` | [`PaginatedOptions`](Services_PaginationDefinition.PaginatedOptions.md)<`Entity`\> | A list with parameters needed for pagination. |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<[`PaginatedEntity`](Services_PaginationDefinition.PaginatedEntity.md)<`Entity`\>\>

___

### getByKey

▸ **getByKey**(`entityKey`, `options?`): [`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`Entity`\>

Method used to get a single element, based on the primary key of the entity.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entityKey` | `KeyType` | The primary key value after which we search. |
| `options?` | `FindOneOptions`<`Entity`\> | Extra options to be used for finding the data. |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )<`Entity`\>

___

### validate

▸ **validate**<`T`\>(`data`): `T`

Validates the given data against the default validator and returns
the data after applying the validator on it.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `T` | The data to be validated. |

#### Returns

`T`

#### Inherited from

[ServiceWithRepository](Services_ServiceWithRepository.ServiceWithRepository.md).[validate](Services_ServiceWithRepository.ServiceWithRepository.md#validate)