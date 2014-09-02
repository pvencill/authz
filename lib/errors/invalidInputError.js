'use strict';

var inherits = require('util').inherits;

function InvalidInputError(message){
    Error.call(this);
    this.message =message;
    this.name = 'InvalidInputError';
}

inherits(InvalidInputError,Error);

module.exports = InvalidInputError;