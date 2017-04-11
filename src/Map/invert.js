// @flow

/**
 * Overwrites duplicate values.
 */
export default function invert<T, U>(m: Map<T, U>): Map<U, T> {
  const res = new Map();
  for (const [key, val] of m.entries()) {
    res.set(val, key);
  };
  return res;
}
