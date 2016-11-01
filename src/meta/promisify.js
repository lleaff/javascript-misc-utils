import arrayInsert from '../array/insert';

/**
 * Take a Node.js callback style async function and return a function that
 *   returns a Promise instead.
 * @param {function(..., cb)} fn - Function taking a callback as last argument,
 *   and to which it will pass eventual errors as first argument.
 * @param {int} [callbackPos] - Manually specify callback argument position,
 *   default to final argument
 */
export default function promisify(fn, callbackPos) {
    const pos = callbackPos === undefined ? fn.length - 1 : callbackPos;

    return function promisified() {
        const promisifiedArgs = Array.prototype.slice.call(arguments);
        return new Promise(function (resolve, reject) {
            function promisifiedCallback(err, ...resolveArgs) {
                if (err) {
                    reject(err);
                } else {
                    resolve.apply(this, resolveArgs);
                }
            }
            const args = arrayInsert(promisifiedArgs, pos, promisifiedCallback);
            fn.apply(this, args);
        });
    };
}
