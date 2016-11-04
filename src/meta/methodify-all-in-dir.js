// @flow
import methodifyAll from './methodify-all';
import requireAllInDir from './require-all-in-dir'

export default function methodifyAllInDir(absoluteDir: path,
                                          reqAllOptions: ?{[key:string]: any}):
    {[key:string]: any} {
    return methodifyAll(requireAllInDir(absoluteDir, reqAllOptions));
}