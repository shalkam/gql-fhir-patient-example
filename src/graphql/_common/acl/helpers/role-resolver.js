export default class roleResolver {
  static guest(req) {
    return typeof req.user === 'undefined';
  }
  static authenticated(req) {
    return typeof req.user === 'object';
  }
  static owner(req, acl, { resourceType, resource, permission }) {
    if (!resource) return false;
    if (resourceType === 'user') return req.user._id === resource._id;
    return typeof req.user._id === resource.userId;
  }
  static getDynamicRoles(req, acl, context) {
    let roles = [];
    if (roleResolver.guest(req)) roles.push('guest');
    if (roleResolver.authenticated(req)) roles.push('authenticated');
    if (roleResolver.owner(req, acl, context)) roles.push('owner');
    return roles;
  }
}
