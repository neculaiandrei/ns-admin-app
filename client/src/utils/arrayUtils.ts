/**
 * Replaces item in array. Item searched by key equal to value.
 * @param arr 
 * @param key 
 * @param value 
 * @param replaceItem 
 * @returns new array
 */
export const replaceItemInArrayBy = (
  arr: any[], 
  key: string, 
  value: any, 
  replaceItem: any
) => {
  const index = arr.findIndex(i => i[key] === value);

  const result = [
    ...arr.slice(0, index), replaceItem, ...arr.slice(index + 1)
  ];
  
  return result;
};