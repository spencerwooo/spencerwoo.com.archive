import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

type AllKeys<T> = T extends never ? never : keyof T
type OptionalKeys<T> = Exclude<AllKeys<T>, keyof T>
type Idx<T, K extends PropertyKey, D = never> = T extends never
  ? never
  : K extends keyof T
  ? T[K]
  : D

type Widen<T> = {
  [K in OptionalKeys<T>]?: Idx<T, K>
} & { [K in keyof T]: T[K] }

// I found widening the Result type is needed because the type is defined
// as a union which effectively omits many of the properties from the type
type NotionDatabaseQueryResult = Widen<QueryDatabaseResponse['results'][number]>
type NotionPageProperties = NonNullable<NotionDatabaseQueryResult['properties']>
export type NotionPagePropertiesValues = NotionPageProperties[string]

export type InferFromType<
  T extends { type: string },
  P extends PropertyKey
> = T extends {
  type: P
}
  ? T
  : never

export type NotionPropertyType = NotionPagePropertiesValues['type']

// This extracts only the type of the 'people' object from the `properties` type.
export type NotionPeopleProperty = InferFromType<
  NotionPagePropertiesValues,
  'people'
>

export type WidenedNotionPeopleResponseObject = Widen<
  NotionPeopleProperty['people'][number]
>
