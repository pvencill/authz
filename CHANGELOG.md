## 0.1.0 (Stable)
Features:
  - Implemented MongoStore to persist permissions map in a MongoDB

## 0.0.1 (unreleased)
Features:
  - Implemented constructor which takes store and options
  - Options currently only support a `defaultDeny` flag which defaults to `true`
  - Implemented initial Store of MemoryStore which uses a non-synchronized JS hash to store permissions
  - Implemented `grant` function to assign rights on a resource to a user through bitwise ANDing
  - Implemented `revoke` function to remove rights on a resource from a user through bitwise subtraction
  - Implemeneted `set` function to overwrite all user rights on a resource
  - Implemented `check` function to callback true if a user has the rights to perform a given action on a resource.
  - Implemented initial sets of rights & roles constants for defaults