import querystring from 'querystring';
import passport from 'passport';
import shortid from 'shortid';
import baseModel from '../../base/model';
import model from './mongoose';
import can from '../helpers/can';

class modelIndex extends baseModel {
  login(root, params, { req, acl }, ast) {
    let res = {};
    if (typeof req.user === 'undefined') {
      req.body.username = params.username;
      req.body.password = params.password;
      res = new Promise(function(resolve, reject) {
        passport.authenticate('local', function(err, user, info) {
          if (err) {
            reject(err);
          } else if (info && info.name && info.name.indexOf('Error') !== -1) {
            reject(new Error(info));
          } else if (!user) {
            reject(new Error('No user returned'));
          } else {
            req.logIn(user, function(err) {
              if (err) {
                reject(err);
              }
              acl.userRoles(req.user._id, (err, roles) => {
                if (err) reject(err);
                resolve({ username: req.user.username, roles });
              });
            });
          }
        })(req);
      })
        .then(token => {
          return { token: JSON.stringify(token), message: 'Logged in successfully' };
        })
        .catch(err => {
          return err;
        });
    } else {
      res = new Error('Already logged in');
    }
    return res;
  }
  logout(root, params, { req, acl }, ast) {
    if (typeof req.user === 'undefined') {
      return new Error("Not logged in, can't log out");
    }
    return new Promise(function(resolve, reject) {
      req.session.destroy(function(err) {
        if (err) reject(err);
        resolve({ result: true });
      });
    });
  }
  register(root, params, { req, acl }, ast) {
    if (can(req, acl, { resourceType: 'user', permission: 'register' }) === false)
      throw new Error('Not Allowed');
    const { password } = params.data;
    delete params.data.password;
    return new Promise(function(resolve, reject) {
      model.register(new model(params.data), password, (err, user) => {
        if (err) {
          reject(err);
        }
        if (!user) {
          reject(new Error('No user returned'));
        }
        resolve(user);
      });
    });
  }
  upsert(root, params, { req, acl }, ast) {
    const canUpsert = can(req, acl, { resourceType: 'user', permission: 'upsert' });
    const canCreate = can(req, acl, { resourceType: 'user', permission: 'create' });
    if (canUpsert === false && canCreate === false) throw new Error('Not Allowed');
    if (!params.data._id) {
      params.data._id = shortid.generate();
    }
    let res = model
      .findByIdAndUpdate(params.data._id, params.data, {
        new: true,
        upsert: canCreate,
        select: this.getProjection(ast)
      })
      .exec();
    if (!res) {
      res = new Error('Error upserting');
    }
    return res;
  }
  changePassword(root, params, { req, acl }, ast) {
    if (can(req, acl, { resourceType: 'user', permission: 'changePassword' }) === false)
      throw new Error('Not Allowed');
    if (!params.password) return false;
    const user = model.findById(params.id);
    return new Promise((resolve, reject) => {
      user.setPassword(params.password, function() {
        user.save(function(error) {
          if (error) {
            reject(error);
          }
          resolve(true);
        });
      });
    });
  }
  findRoles(root, params, { req, acl }, ast) {
    if (can(req, acl, { resourceType: 'user', permission: 'findRoles' }) === false)
      throw new Error('Not Allowed');
    return new Promise((resolve, reject) => {
      acl.userRoles(params.id, function(err, roles) {
        if (err) reject(err);
        resolve(roles);
      });
    });
  }
  syncRoles(root, params, { req, acl }, ast) {
    if (can(req, acl, { resourceType: 'user', permission: 'syncRoles' }) === false)
      throw new Error('Not Allowed');
    const oldRoles = new Promise((resolve, reject) => {
      acl.userRoles(params.id, function(err, roles) {
        if (err) reject(err);
        resolve(roles);
      });
    });
    const rolesToAdd = params.roles.filter(role => {
      return oldRoles.indexOf(role) === -1;
    });
    const rolesToRemove = oldRoles.reduce(
      function(result, role) {
        if (params.roles.indexOf(role) === -1) result.push(role);
        return result;
      },
      []
    );
    if (rolesToAdd.length) {
      const addRoles = new Promise(function(resolve, reject) {
        acl.addUserRoles(params.id, rolesToAdd, function(err) {
          if (err) reject(err);
          resolve(true);
        });
      });
    }
    if (rolesToRemove.length) {
      const removeRoles = new Promise(function(resolve, reject) {
        acl.removeUserRoles(params.id, rolesToRemove, function(err) {
          if (err) reject(err);
          resolve(true);
        });
      });
    }
    const roles = new Promise((resolve, reject) => {
      acl.userRoles(params.id, function(err, roles) {
        if (err) reject(err);
        resolve(roles);
      });
    });
    return { id: params.id, roles };
  }
  find(root, params, { req, acl }, ast) {
    if (can(req, acl, { resourceType: 'user', permission: 'find' }) === false)
      throw new Error('Not Allowed');
    return model.find().select(this.getProjection(ast)).exec();
  }
  findOne(root, params, { req, acl }, ast) {
    if (can(req, acl, { resource, resourceType: 'user', permission: 'findOne' }) === false)
      throw new Error('Not Allowed');
    return model.findById(params.id).select(this.getProjection(ast)).exec();
  }
  remove(root, params, { req, acl }, ast) {
    if (can(req, acl, { resourceType: 'user', permission: 'remove' }) === false)
      throw new Error('Not Allowed');
    return model.findByIdAndRemove(params.id, { select: this.getProjection(ast) }).exec();
  }
}

export default new modelIndex();
