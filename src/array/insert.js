export default function arrayInsert(array, i, item) {
    return [...array.slice(0, i), item, ...array.slice(i)];
};
