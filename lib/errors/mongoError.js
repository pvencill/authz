'use strict';

var inherits = require('util').inherits;

function MongoError(message){
    Error.call(this);
    this.message =message;
    this.name = 'MongoError';
}

inherits(MongoError,Error);

module.exports = MongoError;