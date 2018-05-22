import resolvers from './resolvers';
import schema from './schema.graphql';

const definition = {
  schema,
  resolvers,
  queryText: 'Patient: PatientQuery',
  queries: {
    Patient: () => true,
  },
  mutationText: 'Patient: PatientMutation',
  mutations: {
    Patient: () => true,
  },
};

export default definition;
