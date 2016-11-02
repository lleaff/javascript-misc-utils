/**
 * @example
 * [{ color: 'red', weight: 8 }, { color: 'blue', weight: 9 }].pluck('color')
 * //=> [ 'red', 'blue' ]
 */
export default function arrayPluck(propName) {
    return self.map(obj => obj[propName]);
};