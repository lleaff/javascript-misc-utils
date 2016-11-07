function __treeForEachDepthFirst(t, cb, pth) {
    const newPth = [...pth, t.value];
    cb(t.value, newPth, t);
    if (t.children) {
        t.children.forEach((t, j) =>
            __treeForEachDepthFirst(t, cb, newPth));
    }
}

export default function treeForEach(tree, cb) {
    return __treeForEachDepthFirst(tree, cb, []);
}
