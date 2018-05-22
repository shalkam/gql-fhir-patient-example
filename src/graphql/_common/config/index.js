import resolvers from './resolvers';
import schema from './schema';

const definition = {
  schema,
  resolvers,
  queryText: `config: ConfigQuery`,
  queries: {
    config: () => true
  },
  mutationText: `config: ConfigMutation`,
  mutations: {
    config: () => true
  }
};

export default definition;
