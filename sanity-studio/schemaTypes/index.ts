import {userType} from './userType'
import {postType} from './postType'
import type {SchemaTypeDefinition} from 'sanity'

export const schemaTypes: SchemaTypeDefinition[] = [userType, postType]
