
function MemoryStore(){

}

MemoryStore.prototype = {
  save : function(map, cb){if (cb) cb(); },
  load : function(cb) { if(cb) cb(null, {}); }
};

module.exports = MemoryStore;