function __treeMap(tree, cb, pth, constructor = null) {
    const newPth = [...pth, tree.value];
    const value = cb(tree.value, newPth, tree);
    const children = tree.children ?
        tree.children.map(t => __treeMap(t, cb, newPth, constructor)) :
        tree.children;
    return new (constructor || tree.constructor || Tree)(value, children);
}

export default function treeMap(tree, cb, constructor) {
    return __treeMap(tree, cb, [], constructor);
}

