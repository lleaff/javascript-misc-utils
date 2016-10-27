const { readdirSync } = require('fs');


function applyStringTestTo(test, str) {
    return (test instanceof RegExp ?
        test.test(str) :
    test === str);
}


module.exports = function readdirSyncConfigurable(
  dir,
  { include, exclude, filter } = {})
{
  let fls = readdirSync(dir);
  if (include) {
      const includes = Array.isArray(include) ? include : [include];
      fls = fls.filter(f => includes.some(x => applyStringTestTo(x, f)));
  }
  if (exclude) {
      const excludes = Array.isArray(exclude) ? exclude : [exclude];
      fls = fls.filter(f => excludes.every(x => !applyStringTestTo(x, f)));
  }
  if (filter) {
      fls = fls.filter(filter);
  }
  return fls;
};
