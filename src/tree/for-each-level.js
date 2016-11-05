import treeForEachLevelNodes from './for-each-level-nodes'
import { pluck } from '../array/methods'

export default function treeForEachLevel(tree, cb) {
    treeForEachLevelNodes(tree, function treeForEachLevelCb(level, depth, tree) {
        return cb(level::pluck('value'), depth, tree);
    });
}
