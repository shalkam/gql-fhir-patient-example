import roleResolver from './role-resolver';
import configModel from '../../config/mongoose';
export default async (req, acl, { resource, resourceType, permission }) => {
  const aclEnabled = await configModel.findOne({ key: 'aclEnabled' }).select('value').exec();
  if (!aclEnabled) return true;
  const userAllowed = await acl.isAllowed(
    (req.user && req.user.id) || 'guest',
    resourceType,
    permission
  );
  const rolesAllowed = await acl.areAnyRolesAllowed(
    roleResolver.getDynamicRoles(req, acl, { resource, resourceType, permission }),
    resourceType,
    permission
  );
  return userAllowed === true || rolesAllowed === true;
};
