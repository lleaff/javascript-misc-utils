import objectForEach from '../object/for-each';

export default function deepFreeze(obj) {
    objectForEach(obj, ([_key, val]) => {
        if (typeof val === 'object') {
            deepFreeze(val);
        }
    });
    return obj;
}