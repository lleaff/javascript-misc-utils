export default function toCamelCase(s) {
    return s
        .replace(/^([^A-Za-z]*)([A-Za-z0-9])(.*)/,
                 (match, p1, p2, p3) =>
                     p1 + (p2.toLowerCase() + p3)
                                .replace(/([-_]+)([A-Za-z0-9])/g,
                                         (match, p1, p2) => p1.length === 1 ?
                                             p2.toUpperCase() :
                                             toCamelCase(match.substr(1))));
}
