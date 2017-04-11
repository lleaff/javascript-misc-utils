// @flow

/**
 * Overwrites duplicate array values.
 */
export default function spreadArrayMap<T, U>(m: Map<T[], U>): Map<T, U> {
  const res = new Map();
  for (const [[...keys], val] of m.entries()) {
    for (const key of keys) {
      res.set(key, val);
    }
  };
  return res;
}
