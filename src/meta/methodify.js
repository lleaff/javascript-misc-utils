import arrayInsert from '../array/insert';

/**
 * Transform a function taking its subject as argument into a method passing
 *   the subject as context. Defaults to substituting first argument.
 * @param {Function} fn
 * @param {int|Infinity} [thisArgPos=0] - Infinity causes the last argument to
 *   be substituted.
 * @returns {Function}
 */
export default function methodify(fn, thisArgPos = 0) {
    return function methodified(...args) {
        return fn.apply(this, arrayInsert(args, thisArgPos, this));
    };
}