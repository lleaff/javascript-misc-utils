export default function treeForEach(tree, cb) {
    function treeForEachDepthFirst(t, cb, pth) {
        const newPth = [...pth, t.value];
        cb(t.value, newPth, tree);
        if (t.children) {
            t.children.forEach((t, j) =>
                treeForEachDepthFirst(t, cb, newPth));
        }
    }

    return treeForEachDepthFirst(tree, cb, []);
}

