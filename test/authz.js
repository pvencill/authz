'use strict';
var AuthZ = require('../lib/authz');
var auth = new AuthZ();

function doAndCheck(method, resource, actor, action, shouldPass, done){
    auth[method](resource, actor, action, function(e, res){
        if(e) return done(e);
        auth.check(resource, actor, action, function(err, authorized){
            if(err) return done(err);
            authorized.should.eql(shouldPass);
            done();
        });
    });
}

describe('authz', function(){
    describe('grant right', function(){
        it('should grant READ rights', function(done){
            doAndCheck('grant', 'projects', 'schmedlap', AuthZ.RIGHTS.READ, true, done);
        });
        it('should grant WRITE rights', function(done){
            doAndCheck('grant','projects', 'schmedlap', AuthZ.RIGHTS.WRITE, true, done);
        });
        it('should grant DELETE rights', function(done){
            doAndCheck('grant','projects', 'schmedlap', AuthZ.RIGHTS.DELETE, true, done);
        });
    });

    describe('revoke right', function(){
        it('should revoke READ rights', function(done){
            doAndCheck('revoke','projects', 'schmedlap', AuthZ.RIGHTS.READ, false, done);
        });
        it('should revoke WRITE rights', function(done){
            doAndCheck('revoke','projects', 'schmedlap', AuthZ.RIGHTS.WRITE, false,done);
        });
        it('should revoke DELETE rights', function(done){
            doAndCheck('revoke','projects', 'schmedlap', AuthZ.RIGHTS.DELETE,  false, done);
        });
    });

    describe('grant role', function(){
        it('should grant ADMIN rights', function(done){
            doAndCheck('grant','projects', 'schmedlap', AuthZ.ROLES.ADMIN, true, done);
        });
        it('should grant MEMBER rights', function(done){
            doAndCheck('grant','projects', 'schmedlap', AuthZ.ROLES.MEMBER, true, done);
        });
        it('should grant GUEST rights', function(done){
            doAndCheck('grant','projects', 'schmedlap', AuthZ.ROLES.GUEST, true, done);
        });
    });

    describe('revoke role', function(){
        it('should revoke ADMIN rights', function(done){
            doAndCheck('revoke','projects', 'schmedlap', AuthZ.RIGHTS.READ, false, done);
        });
        it('should revoke MEMBER rights', function(done){
            doAndCheck('revoke','projects', 'schmedlap', AuthZ.RIGHTS.MEMBER, false,done);
        });
        it('should revoke GUEST rights', function(done){
            doAndCheck('revoke','projects', 'schmedlap', AuthZ.RIGHTS.GUEST,  false, done);
        });
    });
});