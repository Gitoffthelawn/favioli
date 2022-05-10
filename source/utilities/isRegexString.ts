/**
 * Determines whether a string is in the shape of a regex
 * @param {string} filter
 * @return {boolean}
 */

export default function isRegexString(filter: string) {
  return filter.length > 2 &&
    filter.startsWith('/') &&
    filter.endsWith('/');
}
