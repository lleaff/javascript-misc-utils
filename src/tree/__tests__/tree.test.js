const Tree = require('../Tree');

function createSimpleTree() {
    return new Tree('0', [
        new Tree('1a', [
            new Tree('2aa'),
            new Tree('2ab')]),
        new Tree('1b'),
        new Tree('1c', [
            new Tree('2ca'),
            new Tree('2cb', [
                new Tree('3cba', [
                    new Tree('4cbaa')
                ])
            ]),
            new Tree('2cc'),
            new Tree('2cd')
        ])
    ]);
}

class CustomTree {
    constructor(val, children, extra) {
        this.val = val;
        this.children = children;
        this.extra = extra;
    }
}

function createCustomTree() {
    return new CustomTree('0', [
        new CustomTree('00', null, 'EXTRA-00'),
        new CustomTree('01', [
            new CustomTree('010', null, 'EXTRA-010')
        ], 'EXTRA-01')
    ], 'EXTRA-0');
}

describe('forEachBfs', () => {
    const forEachBfs = require('../for-each-bfs');

    it('iterates through values breadth first, starting from the root', () => {
        const t = createSimpleTree();
        let pth = [];
        forEachBfs(t, (val) => { pth.push(val); });
        expect(pth).toEqual([
            '0',
            '1a', '1b', '1c',
            '2aa', '2ab', '2ca', '2cb', '2cc', '2cd',
            '3cba',
            '4cbaa'
        ]);
    });

});

describe('forEachLevelNodes', () => {
    const forEachLevelNodes = require('../for-each-level-nodes');

    const t = createSimpleTree();
    let levels = [];
    forEachLevelNodes(t, (nodes) => { levels.push(nodes); });

    it('iterates through each level of nodes starting from the root', () => {
        expect(levels.map(l => l.length)).toEqual([1, 3, 6, 1, 1]);
    });

    it('returns levels filled with instances of the same type as passed in', () => {
        levels.every(level =>
            level.every(n =>
                expect(n).toBeInstanceOf(Tree)));

        const x = createCustomTree();

        let customLevels = [];
        forEachLevelNodes(x, (nodes) => { customLevels.push(nodes); });

        expect(customLevels.length).toBe(3);
        customLevels.every(level =>
            level.every(n =>
                expect(n).toBeInstanceOf(CustomTree)));
        expect(customLevels.map(lvl => lvl.map(n => n.extra))).toEqual(
            [
                ['EXTRA-0'],
                ['EXTRA-00', 'EXTRA-01'],
                ['EXTRA-010']
            ]);
    });
});

describe('forEachLevel', () => {
    const forEachLevel = require('../for-each-level');

    const t = createSimpleTree();
    let levels = [];
    forEachLevel(t, (values) => {
        levels.push(values);
    });

    it('iterates through each level of values starting from the root', () => {
        expect(levels).toEqual([
            ['0'],
            ['1a', '1b', '1c'],
            ['2aa', '2ab', '2ca', '2cb', '2cc', '2cd'],
            ['3cba'],
            ['4cbaa']
        ]);
    });
});


describe('length', () => {
    const length = require('../length');

    it('counts the number of nodes in the tree', () => {
        const t = createSimpleTree();
        expect(length(t)).toBe(12);
    });
});
