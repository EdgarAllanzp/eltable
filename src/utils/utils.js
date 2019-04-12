export function flattenArray(array, recursiveField) {
  return array.reduce((acc, curr) => {
    acc.push(curr);
    if (curr[recursiveField] && curr[recursiveField].length) {
      acc = acc.concat(flattenArray(curr[recursiveField], recursiveField));
    }
    return acc;
  }, []);
}

export function guid() {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}
