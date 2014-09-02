'use strict';
var _ = require('lodash'),
    InvalidInputError = require('../errors/invalidInputError');

function MemoryStore(){
  this.map = {};
}

MemoryStore.prototype = {
  find : function(resources, user, cb){
    var map = this.map;
    if(! _.isArray(resources) && !_.isString(resources)) return cb(new InvalidInputError('Resources must be a string or an array'));
    resources = _.isArray(resources) ? resources : [resources];
    var rights = _.transform(resources, function(result, resource){
      if(map[resource] && map[resource][user])
        result[resource] = _.pick(map[resource], user);
    }, {});
    return cb(null, rights);
  },
  save : function(resource, user, rights, cb){
    if(!this.map[resource]) this.map[resource] = {};
    this.map[resource][user] = rights;
    cb(null, this.map[resource]); // not sure this is needed
  }
};

module.exports = MemoryStore;