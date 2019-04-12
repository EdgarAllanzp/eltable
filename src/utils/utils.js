export function flattenArray(array, recursiveField) {
  return array.reduce((acc, curr) => {
    acc.push(curr);
    if (curr[recursiveField] && curr[recursiveField].length) {
      acc = acc.concat(flattenArray(curr[recursiveField], recursiveField));
    }
    return acc;
  }, []);
}
