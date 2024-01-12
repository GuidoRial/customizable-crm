export const formatArrayWithAnd = (arr: string[]) => {
  if (arr.length === 1) return arr[0];
  return `${arr.slice(0, -1).join(', ')} and ${arr.slice(-1)}`;
};
