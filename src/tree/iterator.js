export default function* iterator(tree) {
    yield tree.value;
    if (tree.children) {
        for (const child of tree.children) {
            yield* iterator(child);
        }
    }
}
