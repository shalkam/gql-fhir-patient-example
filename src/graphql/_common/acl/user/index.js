import resolvers from './resolvers';
import schema from './schema';

const definition = {
  schema,
  resolvers,
  queryText: `user: UserQuery`,
  queries: {
    user: () => true
  },
  mutationText: `user: UserMutation`,
  mutations: {
    user: () => true
  }
};

export default definition;
