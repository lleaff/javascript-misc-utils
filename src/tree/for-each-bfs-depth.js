export default function treeForEachBfsDepth(tree, cb) {
    let levels = [[tree]];
    for (let level = levels.shift(), depth = 0;
         level && level[0];
         level = levels.shift(), depth += 1) {
        let newLevel = [];
        for (let n = level.shift();
             n;
             n = level.shift()) {
            if (n.children) {
                newLevel = [...newLevel, ...n.children];
            }
            cb(n.value, depth, level);
        }
        if (newLevel) {
            levels.push(newLevel);
        }
    }
}
