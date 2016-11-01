/**
 * Transform a function taking its subject as argument into a method passing
 *   the subject as context. Defaults to substituting first argument.
 * @param {Function} fn
 * @param {int} [thisArgPos=0]
 * @returns {Function}
 */
export default function methodify(fn, thisArgPos = 0) {
    const formatArgs = (thisArgPos === 0) ?
        (args) => [this, ...args.slice(1)] :
        (args) => [...args.slice(0, thisArgPos),
                   this,
                   ...args.slice(thisArgPos + 1)];
    return function methodified(...args) {
        return fn.apply(this, formatArgs(args));
    };
}