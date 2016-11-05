export default function treeForEachBfs(tree, cb) {
    let nextNodes = [tree];
    let i = 0;
    for (let n = nextNodes.shift(); n; n = nextNodes.shift()) {
        if (n.children) {
            nextNodes = [...nextNodes, ...n.children];
        }
        cb(n.value, i++, n);
    }
}

