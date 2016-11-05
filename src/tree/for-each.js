export default function treeForEach(tree, cb, pth = []) {
    cb(tree.value, pth, tree);
    if (tree.children) {
        tree.children.forEach((t, j) =>
            treeForEach(t, cb, [...pth, tree.value]));
    }
}
