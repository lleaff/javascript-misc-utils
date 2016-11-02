/**
 * @return { ([accepted[],rejected[]]) }
 */
export default function arrayPartition(arr, predicate, thisArg = null) {
    let truePart  = [],
        falsePart = [];
    arr.forEach((val, i, col) => {
        ((predicate.call(thisArg, val, i, col)) ? truePart : falsePart)
            .push(val);
    });
    return [truePart, falsePart];
};