'use strict';
var _ = require('lodash'),
      MemoryStore = require('./storage/memoryStore'),
      RIGHTS = require('./rights'),
      ROLES = require('./roles');

var defaults = {
  defaultDeny : true
};

function AuthZ(store, opts){
  if(arguments.length < 2 || store === null)
    this.store = new MemoryStore();

  this.options = _.defaults((opts || {}), defaults);
}

// grant adds the rights to the user, if the user has greater rights already nothing happens.
AuthZ.prototype.grant = function grant(resource, user, rights, cb){
  var store = this.store;
  store.find(resource, user, function(e, result){
    if(result && result[resource]){
      result[resource][user] |= rights;
      rights = result[resource][user];
    }
    store.save(resource, user, rights, cb); // might need to account for an array of resources
  });
};

AuthZ.prototype.revoke = function revoke(resource, user, rights, cb){
  var store = this.store;
  store.find(resource, user, function(e, result){
    if(result && result[resource] && result[resource][user]){
      result[resource][user] &= ~rights;
      return store.save(resource, user, result[resource][user], cb);
    }
    cb(null, null);
  });
};

AuthZ.prototype.set = function set(resource, user, rights, cb){
  this.store.save(resource, user, rights, cb);
};

AuthZ.prototype.check = function check(resource, user, action, cb){
  var options = this.options;
  this.store.find(resource, user, function(e,result){
    if(e) return cb(e);
    if(result && result[resource] && result[resource][user])
      return cb(null, !!(result[resource][user] & action));  // should the callback for this have more data associated with it or just true/false?
    return cb(null, !options.defaultDeny);
  });
};

// "constants" for convenience
AuthZ.ROLES = ROLES;
AuthZ.RIGHTS = RIGHTS;

module.exports = AuthZ;