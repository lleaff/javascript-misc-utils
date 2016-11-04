// @flow
export default function arrayReplaceAt(arr: [any],
                                       index: int,
                                       replacement: any) {
    if (index === Infinity) {
        index = arr.length - 1;
    }
    return [...arr.slice(0, index), replacement, ...arr.slice(index + 1)];
}