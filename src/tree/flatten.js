import forEach from './for-each';
import methodify from '../meta/methodify';

const forEachMethod = methodify(forEach);

export default function treeFlatten(tree,
                                    iterFn = forEachMethod,
                                    isMethod = true) {
    let flattened = [];
    if (isMethod) {
        iterFn.call(tree, a => { flattened.push(a); })
    } else {
        iterFn(tree, a => { flattened.push(a); });
    }
    return flattened;
}