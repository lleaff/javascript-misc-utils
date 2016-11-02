// @flow
import patch from './patch';
import promisify from './promisify';

export default function promisifyAll(obj: {[key:string]: any}):
    {[key:string]: any} {
    return patch(obj,
        {
            filter: ([key, val]) =>
                (typeof val === 'function' && !/Sync$/.test(key)),
            transform: fn => promisify(fn)
        });
}
