export default class Tree {
    constructor(value, children) {
        this.value = value;
        if (children !== undefined) {
            this.children = children;
        }
    }

    forEach(cb) {
        return Tree__forEach.call(this, cb);
    }

    forEachBfs(cb) {
        return Tree__forEachBfsDepth.call(this, cb);
    }

    map(cb) {
        return Tree__map.call(this, cb);
    }

    mapTree(cb) {
        return Tree__mapTree.call(this, cb);
    }
};

function Tree__forEach(cb, pth = []) {
    cb(this.value, pth, this);
    if (this.children) {
        this.children.forEach((t, j) =>
            Tree__forEach.call(t, cb, [...pth, this.value]));
    }
}

function Tree__forEachBfs(cb) {
    let nextNodes = [...this.children || []];
    let i = 0;
    for (let n = nextNodes.shift(); n; n = nextNodes.shift()) {
        if (n.children) {
            nextNodes = [...nextNodes, ...n.children];
        }
        cb(n.value, i++, n);
    }
}

function Tree__forEachBfsDepth(cb) {
    let layers = [[this]];
    for (let layer = layers.shift(), depth = 0;
         layer && layer[0];
         layer = layers.shift(), depth += 1) {
        let newLayer = [];
        for (let n = layer.shift();
             n;
             n = layer.shift()) {
            if (n.children) {
                newLayer = [...newLayer, ...n.children];
            }
            cb(n.value, depth, layer);
        }
        if (newLayer) {
            layers.push(newLayer);
        }
    }
}

function Tree__map(cb, pth = []) {
    const value = cb(this.value, pth, this);
    const children = this.children ?
        this.children.map(t => Tree__map.call(t, cb, [...pth, this.value])) :
        null;
    return new (this.constructor ? this.constructor : Tree)(value, children);
}

function Tree__mapTree(cb, pth = []) {
    const children = this.children ?
        this.children.map(t => Tree__mapTree.call(t, cb, [...pth, this])) :
        null;
    return cb(this.value, children, pth, this);
}