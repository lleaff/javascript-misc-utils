function __treeMap(tree, cb, pth, constructorParams) {
    const newPth = [...pth, tree.value];
    const value = cb(tree.value, newPth, tree);
    const children = tree.children ?
        tree.children.map(t => __treeMap(t, cb, newPth, constructorParams)) :
        null;
    return new (tree.constructor ?
        tree.constructor :
        Tree
    )(value, children, ...constructorParams);
}

export default function treeMap(tree, cb, ...constructorParams) {
    return __treeMap(tree, cb, [], constructorParams);
}

