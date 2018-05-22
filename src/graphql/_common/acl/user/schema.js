import { ioSchema } from 'apollo-modules';
export default `
type UserMutation {
  login(username: String, password: String): Login
  logout: Logout
  register(data: UserInput!): User
  upsert(data: UserInput!): User
  syncRoles(id: String!, roles: [String]!): SyncRoles
  changePassword(id: String!, password: String!): Boolean
}
type UserQuery {
  find: [User]
  findOne(id: ID!): User
  findRoles(id: ID!): [ID]
}
type Login {
  token: String
  message: String
}

type Logout {
  result: Boolean
}
type SyncRoles {
  id: String
  roles: [String]
}
${ioSchema(`User$Input {
  _id: String
  email: String
  username: String
  password: String
}`)}`;
