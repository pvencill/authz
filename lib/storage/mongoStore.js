'use strict';
var _ = require('lodash'),
    InvalidInputError = require('../errors/invalidInputError'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;


function MongoStore() {

    var AuthZSchema = new Schema({
        resource: String,
        user: {
            id: String,
            permission: Number
        }
    });

    this.db = mongoose.createConnection.apply(this, arguments);
    mongoose.model('AuthZ', AuthZSchema);
    this.AuthZ = mongoose.model('AuthZ');
}

MongoStore.prototype = {
    find: function (resources, user, cb) {
        if (!_.isArray(resources) && !_.isString(resources)) return cb(new InvalidInputError('Resources must be a string or an array'));

        var rights;
        return cb(null, rights);
    },
    save: function (resource, user, rights, cb) {
        cb(null, true);
    }
};

module.exports = MongoStore;