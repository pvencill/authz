# AuthZ #
AuthZ is a fairly simple authorization library for use in Node regardless of the context or your data model.  It takes string representations of your users and resources and validates whether or not you've granted access.  Default storage is in-memory with JSON persistence, but this is configurable by implementing a fairly simple API.

## Rights and Roles ##
Rights are stored in a bitwise fashion, which you can extend however you like.  We have defined enumerations of default rights and roles, but they are for convenience only; within your system you can arrange the permission bits in whatever way is meaningful to you.

## Overview ##


```js
var AuthZ = require('authz');

// Minimal configuration, all rules are kept in memory while your process is running
var auth = new AuthZ(); 

// Grant a user 'read' rights to something
auth.grant('projects', 'schmedlap', AuthN.RIGHTS.READ, function(e, result){
  // handle result if needed.
});

// Check that the user can 'read' 'projects'
auth.check('projects', 'schmedlap', AuthN.RIGHTS.READ, function(e, authorized){
  // authorized is 'true' if this is called after rights were granted
});

// Assign schmedlap as an ADMIN (grants READ, WRITE, and DELETE rights)
auth.grant('projects', 'schmedlap', AuthN.ROLES.ADMIN, console.log);
// should console out null, and the rights object saved

// Oops, meant to only make him a MEMBER (READ, WRITE).  Note that 'grant' does a bitwise &,so if I grant schmedlap the MEMBER role right now, it won't remove his DELETE rights, so I need to do this instead:
auth.set('projects', 'schmedlap', AuthN.ROLES.MEMBER, console.log);

// Or, I could have instead explicitly removed the DELETE permission
auth.revoke('projects', 'schmedlap', AuthN.RIGHTS.DELETE, console.log);
```


## Options ##
DefaultDeny option is set by default; unless explicitly set to false this option will result in checks returning false for any resource checked which doesn't exist in the permissions map.
