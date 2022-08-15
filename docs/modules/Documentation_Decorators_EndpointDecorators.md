[Spark OneBE - v1.0.30](../README.md) / [Exports](../modules.md) / Documentation/Decorators/EndpointDecorators

# Module: Documentation/Decorators/EndpointDecorators

## Table of contents

### References

- [RequestDocs](Documentation_Decorators_EndpointDecorators.md#requestdocs)
- [ResponseDocs](Documentation_Decorators_EndpointDecorators.md#responsedocs)

### Functions

- [Endpoint](Documentation_Decorators_EndpointDecorators.md#endpoint)
- [EndpointDescription](Documentation_Decorators_EndpointDecorators.md#endpointdescription)
- [EndpointSummary](Documentation_Decorators_EndpointDecorators.md#endpointsummary)

## References

### RequestDocs

Renames and re-exports [Documentation/Decorators/Endpoint/RequestDecorators](Documentation_Decorators_Endpoint_RequestDecorators.md)

___

### ResponseDocs

Renames and re-exports [Documentation/Decorators/Endpoint/ResponseDecorators](Documentation_Decorators_Endpoint_ResponseDecorators.md)

## Functions

### Endpoint

▸ **Endpoint**(`options`): [`RouteDecorator`](Router_RouteTypes.md#routedecorator)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`IEndpointDocumentation`](../interfaces/Documentation_Definition_RouteMetadata.IEndpointDocumentation.md) |

#### Returns

[`RouteDecorator`](Router_RouteTypes.md#routedecorator)

___

### EndpointDescription

▸ **EndpointDescription**(`description?`): [`RouteDecorator`](Router_RouteTypes.md#routedecorator)

#### Parameters

| Name | Type |
| :------ | :------ |
| `description?` | `string` |

#### Returns

[`RouteDecorator`](Router_RouteTypes.md#routedecorator)

___

### EndpointSummary

▸ **EndpointSummary**(`summary?`): [`RouteDecorator`](Router_RouteTypes.md#routedecorator)

#### Parameters

| Name | Type |
| :------ | :------ |
| `summary?` | `string` |

#### Returns

[`RouteDecorator`](Router_RouteTypes.md#routedecorator)