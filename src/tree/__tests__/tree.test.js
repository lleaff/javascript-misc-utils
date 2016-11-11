//= Setup
//------------------------------------------------------------

const deepFreeze = require('../../object/deep-freeze');

function _(strings, args) {
    return strings.reduce((p, str, i) => p + str + args[i])
                  .replace(/\s{2,}/g, ' ');
}

describe('Tree', () => {
    const Tree = require('../Tree');

    function createSimpleT() {
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

    const simpleT = deepFreeze(createSimpleT());
    const simpleTLength = 12;

    const t_0        = simpleT;
    const t_1a       = simpleT.children[0];
    const t_2aa      = simpleT.children[0].children[0];
    const t_2ab      = simpleT.children[0].children[1];
    const t_1b       = simpleT.children[1];
    const t_1c       = simpleT.children[2];
    const t_2ca      = simpleT.children[2].children[0];
    const t_2cb      = simpleT.children[2].children[1];
    const t_3cba     = simpleT.children[2].children[1].children[0];
    const t_4cbaa    = simpleT.children[2].children[1].children[0].children[0];
    const t_2cc      = simpleT.children[2].children[2];
    const t_2cd      = simpleT.children[2].children[3];

    const breadthFirstSimpleTNodes = deepFreeze([
        t_0,
        t_1a, t_1b, t_1c,
        t_2aa, t_2ab, t_2ca, t_2cb, t_2cc, t_2cd,
        t_3cba,
        t_4cbaa
    ]);
    const breadthFirstSimpleTValues = deepFreeze(
            breadthFirstSimpleTNodes.map(a => a.value));

    const depthFirstSimpleTNodes = deepFreeze([
        t_0, t_1a, t_2aa, t_2ab, t_1b, t_1c, t_2ca, t_2cb, t_3cba, t_4cbaa,
        t_2cc, t_2cd
    ]);
    const depthFirstSimpleTValues = deepFreeze(
        depthFirstSimpleTNodes.map(a => a.value));

    const depthFirstSimpleTPaths = deepFreeze(
        [
            ["0"], ["0", "1a"], ["0", "1a", "2aa"],
                                ["0", "1a", "2ab"],
                    ["0", "1b"],
                    ["0", "1c"], ["0", "1c", "2ca"],
                                 ["0", "1c", "2cb"],
                                     ["0", "1c", "2cb", "3cba"],
                                        ["0", "1c", "2cb", "3cba", "4cbaa"],
                                 ["0", "1c", "2cc"],
                                 ["0", "1c", "2cd"]
        ]
    );





    class CustomTree {
        constructor(val, children, extra) {
            this.value = val;
            this.children = children;
            this.extra = extra;
        }
    }

    function createCustomTree() {
        return new CustomTree('0', [
            new CustomTree('00', undefined, 'EXTRA-00'),
            new CustomTree('01', [
                new CustomTree('010', undefined, 'EXTRA-010')
            ], 'EXTRA-01')
        ], 'EXTRA-0');
    }

    function createMixedTree() {
        return new Tree('T0', [
            new CustomTree('X00', undefined, 'EXTRA-00'),
            new Tree('T01', [
                new CustomTree('X010', [
                    new Tree('T0100')
                ], 'EXTRA-010')
            ])
        ]);
    }

    //= Tests
    //------------------------------------------------------------

    function forEachBfs_forEachBfsDepth_commonTests(fn) {
        let values = [];
        let secondArgs = [];
        let nodes = [];
        fn(simpleT, (value, secondArg, tree) => {
            values.push(value);
            secondArgs.push(secondArg);
            nodes.push(tree);
        });

        it(_`iterates through values breadth first, keeping children order,
           starting from the root`, () => {
            expect(values).toEqual(breadthFirstSimpleTValues);
        });

        it(_`passes current node as third argument to callback`, () => {
            expect(nodes).toEqual(breadthFirstSimpleTNodes);
        });

        return secondArgs;
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
        forEachLevelNodes(simpleT, (nodes) => { levels.push(nodes); });

        it(`iterates through each level of nodes starting from the 
            root`, () => {
            expect(levels.map(l => l.length)).toEqual([1, 3, 6, 1, 1]);
        });

        it(_`calls callback with arrays filled with instances of the same type
            as passed in`, () => {
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
        forEachLevel(simpleT, (values) => {
            levels.push(values);
        });

        it(_`iterates through each level of values starting from the
            root`, () => {
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


        let values = [];
        let pths = [];
        let nodes = [];
        forEach(simpleT, (value, pth, node) => {
            values.push(value);
            pths.push(pth);
            nodes.push(node);
        });

        it(_`iterates through values depth first, starting from the
             root`, () => {
            expect(values).toEqual(depthFirstSimpleTValues);
        });

        it(_`passes path (an array of the visited values in visit order) as
             second argument to callback`, () => {
            expect(pths).toEqual(depthFirstSimpleTPaths);
        });

        it('passes the current node as third argument to callback', () => {
            expect(nodes).toEqual(depthFirstSimpleTNodes);
        })
    });

    describe('flatten', () => {
        const flatten = require('../flatten');
        const forEachBfs = require('../for-each-bfs');

        it(_`returns an array of values returned from tree-traversal function
             in visit order, which defaults to forEach (depth first)`, () => {
            const flattened = flatten(simpleT);
            expect(flattened).toEqual(depthFirstSimpleTValues);
        });

        it(_`accepts a tree-traversal method of the form (callback)=>{} as
             optional second argument`, () => {
            const forEachBfsMethod = function(...args) {
                return forEachBfs(this, ...args);
            };
            const flattened = flatten(simpleT, forEachBfsMethod);
            expect(flattened).toEqual(breadthFirstSimpleTValues);
        });

        it(_`accepts a tree-traversal function of the form (tree, callback)=>{}
             if third argument \`isMethod\` set to false`, () => {
            const flattened = flatten(simpleT, forEachBfs, false);
            expect(flattened).toEqual(breadthFirstSimpleTValues);
        });
    });

    describe('map', () => {
        const map = require('../map');

        let pths = [];
        let nodes = [];
        const mapped = map(simpleT, (val, pth, n) => {
            pths.push(pth);
            nodes.push(n);
            return val.toUpperCase();
        });

        it('creates new nodes using values returned by callback', () => {
            expect(mapped).toEqual(
                new Tree('0', [
                    new Tree('1A', [
                        new Tree('2AA'),
                        new Tree('2AB')]),
                    new Tree('1B'),
                    new Tree('1C', [
                        new Tree('2CA'),
                        new Tree('2CB', [
                            new Tree('3CBA', [
                                new Tree('4CBAA')
                            ])
                        ]),
                        new Tree('2CC'),
                        new Tree('2CD')
                    ])
                ])
            );
        });

        function CountedTree(val, children) {
            this.value = val;
            this.children = children;
            this.childCount = children ? children.length : 0;
        }

        console.log(createCustomTree());
        const countedMapped = map(createCustomTree(), (val, pth, node) => {
            return val.split('').join('-');
        }, CountedTree);

        it(_`optionally accepts a third argument constructor which will be
             called with: (callbackResult, children) to create the new
             nodes`,() => {
            expect(countedMapped).toEqual(
                new CountedTree('0', [
                    new CountedTree('0-0'),
                    new CountedTree('0-1', [
                        new CountedTree('0-1-0')
                    ])
                ])
            );
        });

        it('passes path as second argument to callback', () => {
            expect(pths).toEqual(depthFirstSimpleTPaths);
        });

        it('passes node as second argument to callback', () => {
            expect(nodes).toEqual(depthFirstSimpleTNodes);
        });

    });

    describe('length', () => {
        const length = require('../length');

        it('counts the number of nodes in the tree', () => {
            expect(length(simpleT)).toBe(simpleTLength);
        });
    });

    describe('iterator', () => {
        it('iterates through values depth first', () => {
            const values = [];
            for (const v of simpleT) {
                values.push(v);
            }

            expect(values).toEqual(depthFirstSimpleTValues);
        })
    });
});
