import resolvers from './resolvers';
import schema from './schema';

const definition = {
  schema,
  resolvers,
  queryText: `role: RoleQuery`,
  queries: {
    role: () => true
  },
  mutationText: `role: RoleMutation`,
  mutations: {
    role: () => true
  }
};

export default definition;
