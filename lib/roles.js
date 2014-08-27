var rights = require('./rights');

module.exports = {
  ADMIN : rights.READ ^ rights.WRITE ^ rights.DELETE,
  MEMBER : rights.READ ^ rights.WRITE,
  GUEST : rights.READ
};