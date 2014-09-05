var AuthZ = require('../lib/authz');
var auth = new AuthZ();

describe('authz', function(){
    describe('grant right', function(){
        it('should grant READ rights', function(done){
            auth.grant('projects', 'schmedlap', AuthZ.RIGHTS.READ, done);
        });
        it('should grant WRITE rights', function(done){
            auth.grant('projects', 'schmedlap', AuthZ.RIGHTS.WRITE, done);
        });
        it('should grant DELETE rights', function(done){
            auth.grant('projects', 'schmedlap', AuthZ.RIGHTS.DELETE, done);
        });
    });

    describe('revoke right', function(){
        it('should revoke READ rights', function(done){
            auth.revoke('projects', 'schmedlap', AuthZ.RIGHTS.READ, done);
        });
        it('should revoke WRITE rights', function(done){
            auth.revoke('projects', 'schmedlap', AuthZ.RIGHTS.WRITE, done);
        });
        it('should revoke DELETE rights', function(done){
            auth.revoke('projects', 'schmedlap', AuthZ.RIGHTS.DELETE, done);
        });
    });

    describe('grant role', function(){
        it('should grant ADMIN rights', function(done){
            auth.grant('projects', 'schmedlap', AuthZ.ROLES.ADMIN, done);
        });
        it('should grant MEMBER rights', function(done){
            auth.grant('projects', 'schmedlap', AuthZ.ROLES.MEMBER, done);
        });
        it('should grant GUEST rights', function(done){
            auth.grant('projects', 'schmedlap', AuthZ.ROLES.GUEST, done);
        });
    });
});