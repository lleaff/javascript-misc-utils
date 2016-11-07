function __treeMapNodes(tree, cb, pth) {
    const newPth = [...pth, tree.value];
    const children = tree.children ?
        tree.children.map(t => __treeMapNodes(t, cb, newPth)) :
        null;
    return cb(tree.value, children, tree, newPth);
}

export default function treeMapNodes(tree, cb) {
    return __treeMapNodes(tree, cb, []);
}
