import treeForEach from './for-each';

export default function treeLength(tree) {
    let i = 0;
    treeForEach(tree, () => { i += 1; })
    return i;
}