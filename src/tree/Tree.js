const methodify = require('../meta/methodify');

module.exports = class Tree {
    constructor(value, children) {
        this.value = value;
        if (children !== undefined) {
            this.children = children;
        }
    }

    forEach           = methodify(require('./for-each'));
    forEachBfs        = methodify(require('./for-each-bfs'));
    forEachBfsDepth   = methodify(require('./for-each-bfs-depth'));
    forEachLevel      = methodify(require('./for-each-level'));
    forEachLevelNodes = methodify(require('./for-each-level-nodes'));
    map               = methodify(require('./map'));
    mapNodes          = methodify(require('./map-nodes'));
    flatten           = methodify(require('./flatten'));
    [Symbol.iterator] = methodify(require('./iterator'));

};



