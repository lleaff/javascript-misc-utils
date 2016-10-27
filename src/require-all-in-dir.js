const path = require('path');
const toCamelCase = require('./string/to-camel-case');
const readdirSyncConfigurable = require('./fs/readdir-sync-configurable');
const arrayMapToObject = require('./array/map-to-object');

function trace(...args) {
    console.log('TRACE: [', this,']', ...args);
    return this;
};

function pipe(cb, ...args) {
    return cb ? cb.call(this, this, ...args) : this;
}

function flatConcat(a) {
    return [ ...this, ...(Array.isArray(a) ? a : [a])];
}

function maybeFlatConcat(a) {
    return a ? this::flatConcat(a) : this;
}

/**
 * @param dir
 * @param {String|RegExp|[String|RegExp]} [include=/\.jsx?$/] - Whitelist
 *   filenames or RegExps to include in require.
 * @param {String|RegExp|[String|RegExp]} [exclude='index.js'] - Filenames or
 *   RegExps to exclude from require. Takes precedence over `include`.
 * @returns {*}
 */
module.exports = function requireAllInDir(
    dir,
    { exclude, include, filter } = {}) {
    const excludes = [ 'index.js' ]::maybeFlatConcat(exclude);
    const includes = [ /\.jsx?$/ ]::maybeFlatConcat(include);
    const files = readdirSyncConfigurable(dir,
                                          {
                                            exclude: excludes,
                                            include: includes,
                                            filter
                                          });
     return arrayMapToObject(
         files,
         f => [toCamelCase(f), require(path.resolve(dir, f))]);
};
