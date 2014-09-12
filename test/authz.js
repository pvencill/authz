'use strict';
var AuthZ = require('../lib/authz');
var auth = new AuthZ();

function doAndCheck(method, resource, actor, action, shouldPass, done) {
    auth[method](resource, actor, action, function (e, res) {
        if (e) return done(e);
        auth.check(resource, actor, action, function (err, authorized) {
            if (err) return done(err);
            authorized.should.eql(shouldPass);
            done();
        });
    });
}

describe('authz', function () {

    /**
     * Test the following
     * AuthZ.ROLES, AuthZ.RIGHTS
     */
    ['ROLES', 'RIGHTS'].forEach(function (entity) { // begin object testing
        /** Test the named methods for each **/
        ['set', 'revoke', 'grant'].forEach(function (method) { // begin method testing
            describe(method + ' ' + entity, function () { // begin access testing
                for (var right in AuthZ[entity]) {
                    it('should ' + method + ' ' + right + ' ' + entity, function (done) {
                        doAndCheck(method, 'projects', 'schmedlap', AuthZ[entity][right], (method != 'revoke'), done);
                    });
                }
            }); // end access testing
        }); // end method testing
    }); // end object testing

});