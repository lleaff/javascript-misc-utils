export default function treeMap(tree, cb, pth = []) {
    const value = cb(tree.value, pth, tree);
    const children = tree.children ?
        tree.children.map(t => treeMap(t, cb, [...pth, tree.value])) :
        null;
    return new (tree.constructor ? tree.constructor : Tree)(value, children);
}

