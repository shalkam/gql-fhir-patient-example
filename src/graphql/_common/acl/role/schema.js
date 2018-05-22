import { ioSchema } from 'apollo-modules';
export default `
type RoleQuery {
  find: [String]
  findOne(role: ID!): Role
}
type RoleMutation {
  upsert(data: RoleInput!): Role
  remove(role: ID!): ID
}
enum permissionsEnum {
  create
  upsert
  upsertOwn
  remove
  removeOwn
  find
  findOwn
  findOne
  findOneOwn
  login
  logout
  register
  changePassword
  changeOwnPassword
  findRoles
  findOwnRoles
  syncRoles
  none
}
enum resourcesEnum {
  newCar
  usedCar
  checkedCar
  role
  user
  config
}
type Role {
  roles: String
  allows: [Allows]
}
type Allows {
  resources: [resourcesEnum]
  permissions: [permissionsEnum]
}
input RoleInput {
  roles: String
  allows: [ResourcesInput]
}
input ResourcesInput {
  resources: [resourcesEnum]
  permissions: [permissionsEnum]
}`;
