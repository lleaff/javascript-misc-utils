/**
 * @example
 * [{ color: 'red', weight: 8 }, { color: 'blue', weight: 9 }].pluck('color')
 * //=> [ 'red', 'blue' ]
 */
export default function arrayPluck(arr, propName) {
    return arr.map(obj => obj[propName]);
};