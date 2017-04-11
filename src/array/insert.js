// @flow
/**
 *
 * @param index - Infinity will evaluate to array length (= append behavior).
 */
export default function arrayInsert(arr: any[],
                                    index: int,
                                    toInsert: any): any[] {
    if (index === Infinity) {
        index = arr.length;
    }
    return [...arr.slice(0, index), toInsert, ...arr.slice(index)];
};
