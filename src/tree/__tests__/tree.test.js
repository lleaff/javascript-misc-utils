const deepFreeze = require('../../object/deep-freeze');

describe('Tree', () => {
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

    createSimpleTree.TREE_LENGTH = 12;

    const simpleTree = deepFreeze(createSimpleTree());
    const t_0        = simpleTree;
    const t_1a       = simpleTree.children[0];
    const t_2aa      = simpleTree.children[0].children[0];
    const t_2ab      = simpleTree.children[0].children[1];
    const t_1b       = simpleTree.children[1];
    const t_1c       = simpleTree.children[2];
    const t_2ca      = simpleTree.children[2].children[0];
    const t_2cb      = simpleTree.children[2].children[1];
    const t_3cba     = simpleTree.children[2].children[1].children[0];
    const t_4cbaa    = simpleTree.children[2].children[1].children[0].children[0];
    const t_2cc      = simpleTree.children[2].children[2];
    const t_2cd      = simpleTree.children[2].children[3];
    

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

    function createMixedTree() {
        return new Tree('T0', [
            new CustomTree('X00', null, 'EXTRA-00'),
            new Tree('T01', [
                new CustomTree('X010', [
                    new Tree('T0100')
                ], 'EXTRA-010')
            ])
        ]);
    }

    function forEachBfs_forEachBfsDepth_commonTests(fn) {
        let iterations = [];
        fn(simpleTree, (value, secondArg, tree) => {
            iterations.push({ value, secondArg, tree });
        });

        it('iterates through values breadth first, keeping children order, starting from the root', () => {
            expect(iterations.map(a => a.value)).toEqual([
                '0',
                '1a', '1b', '1c',
                '2aa', '2ab', '2ca', '2cb', '2cc', '2cd',
                '3cba',
                '4cbaa'
            ]);
        });

        it('passes current node as third argument to callback', () => {
            expect(iterations.map(a => a.tree)).toEqual([
                t_0,
                t_1a, t_1b, t_1c,
                t_2aa, t_2ab, t_2ca, t_2cb, t_2cc, t_2cd,
                t_3cba,
                t_4cbaa
            ]);
        });

        return iterations.map(a => a.secondArg);
    }

    describe('forEachBfs', () => {
        const forEachBfs = require('../for-each-bfs');

        const indices = forEachBfs_forEachBfsDepth_commonTests(forEachBfs);

        it('passes incrementing index as second argument to callback', () => {
            expect(indices).toEqual([
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
            ]);
        })
    });

    describe('forEachBfsDepth', () => {
        const forEachBfsDepth = require('../for-each-bfs-depth');

        const depths = forEachBfs_forEachBfsDepth_commonTests(forEachBfsDepth);

        it('passes the current depth as second argument to callback', () => {
            expect(depths).toEqual([
                0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 4
            ]);
        })
    });

    describe('forEachLevelNodes', () => {
        const forEachLevelNodes = require('../for-each-level-nodes');

        let levels = [];
        forEachLevelNodes(simpleTree, (nodes) => { levels.push(nodes); });

        it('iterates through each level of nodes starting from the root', () => {
            expect(levels.map(l => l.length)).toEqual([1, 3, 6, 1, 1]);
        });

        it('calls callback with arrays filled with instances of the same type as passed in', () => {
            levels.every(level =>
                level.every(n =>
                    expect(n).toBeInstanceOf(Tree)));

            const x = createMixedTree();

            let mixedLevels = [];
            forEachLevelNodes(x, (nodes) => { mixedLevels.push(nodes); });

            expect(mixedLevels.length).toBe(4);
            expect(mixedLevels.map(lvl => lvl.map(n => n.constructor))).toEqual(
                [
                    [Tree],
                    [CustomTree, Tree],
                    [CustomTree],
                    [Tree]
                ]);
        });

    });

    describe('forEachLevel', () => {
        const forEachLevel = require('../for-each-level');

        let levels = [];
        forEachLevel(simpleTree, (values) => {
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

    describe('forEach', () => {
        const forEach = require('../for-each');


        let iterations = [];
        forEach(simpleTree, (value, pth, tree) => {
            iterations.push({ value, pth, tree });
        });

        it('iterates through values depth first, starting from the root', () => {
            expect(iterations.map(a => a.value)).toEqual([
                '0', '1a', '2aa', '2ab', '1b', '1c', '2ca', '2cb', '3cba',
                '4cbaa', '2cc', '2cd'
            ]);
        });

        it('passes an array of the visited values in visit order as second argument to callback', () => {
            expect(iterations.map(a => a.pth)).toEqual([
                ["0"], ["0", "1a"], ["0", "1a", "2aa"],
                                    ["0", "1a", "2ab"],
                        ["0", "1b"],
                        ["0", "1c"], ["0", "1c", "2ca"],
                                     ["0", "1c", "2cb"],
                                         ["0", "1c", "2cb", "3cba"],
                                            ["0", "1c", "2cb", "3cba", "4cbaa"],
                                     ["0", "1c", "2cc"],
                                     ["0", "1c", "2cd"]
            ]);
        });

        it('passes the current node as third argument to callback', () => {
            expect(iterations.map(a => a.tree)).toEqual([
                t_0, t_1a, t_2aa, t_2ab, t_1b, t_1c, t_2ca, t_2cb, t_3cba,
                t_4cbaa, t_2cc, t_2cd
            ]);
        })
    });


    describe('length', () => {
        const length = require('../length');

        it('counts the number of nodes in the tree', () => {
            expect(length(simpleTree)).toBe(createSimpleTree.TREE_LENGTH);
        });
    });

    describe('iterator', () => {
        it('iterates through values depth first', () => {
            const values = [];
            for (const v of simpleTree) {
                values.push(v);
            }

            expect(values).toEqual([
                '0', '1a', '2aa', '2ab', '1b', '1c', '2ca', '2cb', '3cba',
                '4cbaa', '2cc', '2cd'
            ]);
        })
    });
});
