export function flattenArray(array, recursiveField) {
  return array.reduce((acc, curr) => {
    if (curr[recursiveField] && curr[recursiveField].length) {
      acc = acc.concat(flattenArray(curr[recursiveField], recursiveField));
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
}
