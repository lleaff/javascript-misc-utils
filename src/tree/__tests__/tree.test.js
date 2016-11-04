const Tree = require('../Tree');
const forEachBfs = require('../for-each-bfs');

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

describe('forEachBfs', () => {

    it('iterates through nodes breadth first, starting from the root nodes', () => {
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
