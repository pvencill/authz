'use strict';
var _ = require('lodash'),
      MemoryStore = require('./storage/memoryStore'),
      RIGHTS = require('./rights'),
      ROLES = require('./roles');

var defaults = {
  defaultDeny : true
};

function AuthN(store, opts){
  if(arguments.length < 2 || store === null)
    this.store = new MemoryStore();

  this.options = _.defaults((opts || {}), defaults);

  this.map = {};
}

// grant adds the rights to the user, if the user has greater rights already nothing happens.
AuthN.prototype.grant = function grant(resource, user, rights){
  if(!this.map[resource])
    this.map[resource] = {};
  if(!this.map[resource][user])
    this.map[resource][user] = rights;
  else
    this.map[resource][user] |= rights;
};

AuthN.prototype.revoke = function revoke(resource, user, rights){
  if(!this.map[resource]) return;
  if(!this.map[resource][user]) return;
  this.map[resource][user] &= ~rights;
};

// set overwrites whatever rights are currently set for the user with those provided.
AuthN.prototype.set = function set(resource, user, rights){
  if(!this.map[resource]) return;
  this.map[resource][user] = rights;
};

AuthN.prototype.getMap = function getMap(){
  return _.extend({}, this.map);
};

AuthN.prototype.check = function check(resource, user, action){
  if(!this.map[resource] && this.options.defaultDeny)
    return false;
  return !!(this.map[resource][user] & action);
};

// "constants" for convenience
AuthN.ROLES = ROLES;
AuthN.RIGHTS = RIGHTS;

module.exports = AuthN;