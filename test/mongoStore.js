'use strict';
var MongoStore = require('../lib/storage/mongoStore'),
    AuthZ = require('../lib/authz'),
    mongoose = require('mongoose'),
    store = new MongoStore('mongodb://localhost/authz_test');

describe('MongoStore', function () {
    describe('#save()', function () {
        it('should save without an error', function (done) {
            store.save("/my/cool/resource", "user", AuthZ.RIGHTS.WRITE, done);
        })
    });
    describe('#find()', function () {
        it('should find without an error', function (done) {
            store.find("/my/cool/resource", "user", done);
        })
    })
});