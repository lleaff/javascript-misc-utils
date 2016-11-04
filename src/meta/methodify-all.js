// @flow
import methodify from './methodify';
import patch from './patch';

export default function methodifyAll(obj: {[key:string]: any}):
    {[key:string]: any} {
    return patch(obj, { filter: x => typeof x === 'function',
                        transform: methodify });
}
