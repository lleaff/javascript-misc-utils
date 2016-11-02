export default function arrayOccurences(arr) {
    let occ = new Map(arr.map(val => [val, 0]));
    arr.forEach(val => {
        occ.set(val, occ.get(val) + 1);
    });
    return occ;
};
