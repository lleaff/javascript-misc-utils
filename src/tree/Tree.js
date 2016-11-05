const methodify = require('../meta/methodify');

const forEach           = methodify(require('./for-each'));
const forEachBfs        = methodify(require('./for-each-bfs'));
const forEachBfsDepth   = methodify(require('./for-each-bfs-depth'));
const forEachLevel      = methodify(require('./for-each-level'));
const forEachLevelNodes = methodify(require('./for-each-level-nodes'));
const map               = methodify(require('./map'));
const mapNodes          = methodify(require('./map-nodes'));

module.exports = class Tree {
    constructor(value, children) {
        this.value = value;
        if (children !== undefined) {
            this.children = children;
        }
    }

    forEach(cb) {
        return this::forEach(cb);
    }

    forEachBfs(cb) {
        return this::forEachBfs(cb);
    }

    forEachBfsDepth(cb) {
        return this::forEachBfsDepth(cb);
    }

    forEachLevel(cb) {
        return this::forEachLevel(cb);
    }

    forEachLevelNodes(cb) {
        return this::forEachLevelNodes(cb);
    }

    map(cb) {
        return this::map(cb);
    }

    mapNodes(cb) {
        return this::mapNodes(cb);
    }
};
