= AuthN =
AuthN is a fairly simple authorization library for use in Node regardless of the context or your data model.  It takes string representations of your users and resources and validates whether or not you've granted access.  Default storage is in-memory with JSON persistence, but this is configurable by implementing a fairly simple API.

== Permissions and Roles ==
Permissions are stored in a bitwise fashion, which you can extend however you like.  We have defined enumerations of default permissions and roles, but they are for convenience only; within your system you can arrange the permission bits in whatever way is meaningful to you.

== Options ==
DefaultDeny option is set by default; unless explicitly set to false this option will result in checks returning false for any resource checked which doesn't exist in the permissions map.