const path = require('path');
const toCamelCase = require('../string/to-camel-case');
const arrayMapToObject = require('../array/map-to-object');
const partition = require('../array/partition');
const { readdirSync, statSync } = require('fs');
const pick = require('../object/pick');
const stripExtension = require('../string/strip-extension');

function toArrayIfNot(a) {
    return Array.isArray(a) ? a : [a];
}

function arrayFlatConcat(a) {
    return [ ...this, ...(Array.isArray(a) ? a : [a])];
}

function arrayMaybeFlatConcat(a) {
    return a ? this::arrayFlatConcat(a) : this;
}

function applyStringTestTo(test, str) {
    return (test instanceof RegExp ?
              test.test(str) :
              test === str);
}

/**
 * @typedef {object} requireAllInDirFileOptions
 * @property {String|RegExp|[String|RegExp]} [include] - Whitelist filenames or
 *   RegExps to include in require.
 * @property {String|RegExp|[String|RegExp]} [exclude] - Filenames or RegExps
 *   to exclude from require. Takes precedence over `include`.
 * @property {(filename: string)=>boolean} [filter]
 */

/**
 * @param absoluteDir
 * @param {requireAllInDirFileOptions} [options.files={  include: /\.jsx?$/,
 *                                                       exclude: 'index.js' }]
 *
 *
 * @param {requireAllInDirFileOptions} [options.directories]
 * @param {...requireAllInDirFileOptions} [options] - Options to apply to both
 *   files and directories.
 * @param {boolean} [options.includeDirs=true]
 * @returns {*}
 */
module.exports = function requireAllInDir(absoluteDir, options = {})
{
    const includeDirs = options.includeDirs === undefined ? true : false;
    const pickFOpts = o => pick(o, [
        'include', 'exclude', 'filter'
    ]);
    const filterFiles = (fls, { include, exclude, filter } = {}) => {
        if (include) {
            const includes = toArrayIfNot(include);
            fls = fls.filter(f => includes.some(x => applyStringTestTo(x, f)));
        }
        if (exclude) {
            const excludes = toArrayIfNot(exclude);
            fls = fls.filter(f => excludes.every(x => !applyStringTestTo(x, f)));
        }
        if (filter) {
            fls = fls.filter(filter);
        }
        return fls;
    };
    const allOpts = pickFOpts(options);
    const fileOpts = pickFOpts(options.files || {});
    fileOpts.include = [ /\.jsx?$/ ]::arrayMaybeFlatConcat(fileOpts.include);
    fileOpts.exclude = [ 'index.js' ]::arrayMaybeFlatConcat(fileOpts.exclude);
    const dirOpts  = pickFOpts(options.directories || {});

    const dir = path.resolve(absoluteDir);
    let all = readdirSync(dir);
    all = filterFiles(all, allOpts);
    let [files, dirs] = partition(all,
                                  f => statSync(path.join(dir, f)).isFile());
    files = filterFiles(files, fileOpts);
    dirs = includeDirs ? filterFiles(dirs, dirOpts) : [];


    return arrayMapToObject(
        [...files, ...dirs].map(stripExtension),
        f => [toCamelCase(f), require(path.join(dir, f))]);
};
