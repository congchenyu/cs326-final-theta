const MD5 = require('nodejs-md5');

function md5(str) {
  let result = '';
  MD5.string.quiet(str, function(err, res) {
    result = res;
  });
  return result;
} 

module.exports = {
  md5
}