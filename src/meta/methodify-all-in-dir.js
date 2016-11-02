// @flow
import methodify from './methodify';
import patch from './patch';
import requireAllInDir from './require-all-in-dir'

function methodifyAll(obj: {[key:string]: any}): {[key:string]: any} {
    return patch(obj, { filter: x => typeof x === 'function',
                        transform: methodify });
}

export default function methodifyAllInDir(absoluteDir: path,
                                          reqAllOptions: ?{[key:string]: any}):
    {[key:string]: any} {
    return methodifyAll(requireAllInDir(absoluteDir, reqAllOptions));
}