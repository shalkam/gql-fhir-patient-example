import { addModules } from 'apollo-modules';
import { makeExecutableSchema } from 'graphql-tools';
import schema from './schema.graphql';
import schemaCommon from './app/_common/schema/index';
import resolversCommon from './app/_common/resolvers/index';
import Patient from './app/patient';
import Role from './_common/acl/role';
import User from './_common/acl/user';

let gqlSchema;
if (process.env.NODE_ENV === 'production') {
  gqlSchema = makeExecutableSchema({
    typeDefs: schema,
  });
} else {
  const modules = addModules([Patient, Role, User]);
  gqlSchema = makeExecutableSchema({
    typeDefs: schemaCommon + modules.schema,
    resolvers: { ...resolversCommon, ...modules.resolvers },
  });
}
const GQLSchema = gqlSchema;
export default GQLSchema;
