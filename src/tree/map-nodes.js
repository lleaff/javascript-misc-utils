export default function treeMapNodes(tree, cb, pth = []) {
    const children = tree.children ?
        tree.children.map(t => treeMapNodes(t, cb, [...pth, tree])) :
        null;
    return cb(tree.value, children, pth, tree);
}
