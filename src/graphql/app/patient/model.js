import baseModel from '../../_common/base/model';
import model from './mongoose';

/**
 * Model for a resource containing all the crud operations
 */
class ModelIndex extends baseModel {
  create = (root, params) =>
    model.create(params.resource).then(resource => ({ resource })).catch(err => new Error(err));
  update = (root, params, { req, acl }, ast) =>
    model
      .findByIdAndUpdate(params.data.id, params.data, {
        new: true,
        select: this.getProjection(ast),
      })
      .exec()
      .catch(err => new Error(err));
  delete = (root, params, { req, acl }, ast) =>
    model
      .findByIdAndRemove(params.id, { select: this.getProjection(ast) })
      .exec()
      .then(() => ({
        information: {
          issue: [
            {
              severity: 'information',
              code: 'informational',
              diagnostics: 'Patient was removed successfully',
            },
          ],
        },
      }))
      .catch(err => new Error(err));
  find = (root, params, { req, acl }, ast) => {
    const filter = params.filter ? params.filter : {};
    return model.find(filter).select(this.getProjection(ast)).exec().catch(err => new Error(err));
  };
  findOne = (root, params, { req, acl }, ast) =>
    model.findById(params.id).select(this.getProjection(ast)).exec().catch(err => new Error(err));
}

export default new ModelIndex();
