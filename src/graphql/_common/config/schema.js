import { ioSchema } from 'apollo-modules';
export default `
${ioSchema(`Config$Input {
  _id: ID
  key: String!
  value: String
}`)}
input ConfigFilter {
  _id: ID
  key: String
  value: String
}
type ConfigMutation {
  remove(id: ID!): Config
  removeAll: Boolean
  upsert(data: ConfigInput!): Config
}
type ConfigQuery {
  find(filter: ConfigFilter): [Config]
  findOne(id: ID!): Config
}`;
