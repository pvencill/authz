'use strict';
var _ = require('lodash'),
    InvalidInputError = require('../errors/invalidInputError'),
    MongoError = require('../errors/mongoError'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    AuthZ = null;


function MongoStore() {

    var AuthZSchema = new Schema({
        resource: String,
        user: String,
        permission: Number
    });

    // resource and user make a unique entity
    AuthZSchema.index({resource: 1, user: 1}, {unique: true});

    mongoose.connect.apply(mongoose, arguments);
    // TODO: Add in an option to pass in a name of a collection
    mongoose.model('AuthZ', AuthZSchema);
    AuthZ = mongoose.model('AuthZ');
}

MongoStore.prototype = {
    find: function (resources, user, cb) {

        if (!_.isArray(resources) && !_.isString(resources)) return cb(new InvalidInputError('Resources must be a string or an array'));

        AuthZ.find({ 'resource': { $in: new Array(resources)}, 'user': user  }, function (err, results) {
            if (err) return cb(new MongoError(err));

            // [resource] = number
            var rights = _.transform(results, function (ret, obj) {
                ret[obj.resource] = obj.permission;
            });
            return cb(null, rights);
        });

    },
    save: function (resource, user, rights, cb) {

        AuthZ.update({resource: resource, user: user}, {
            resource: resource,
            user: user,
            permission: rights
        }, {upsert: true}, function (err, numberAffected, rawResponse) {
            if (err) return cb(new MongoError(err));
            else return cb(null, true);
        });

    }
};

module.exports = MongoStore;