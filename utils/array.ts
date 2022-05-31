export const changeArrayOrder =  (arr: any[],from: number, to: number) => {
  const newArr = [...arr];
   newArr.splice(to, 0, newArr.splice(from, 1)[0]);
   return newArr;
};

export  const range = (size: number, startAt: number = 0): number[] => {
  return Array.apply(0, Array(size))
    .map((element, index) => index + startAt);
}
export const removeObjectEmpty = (obj) => {
  return Object.entries(obj)
    .filter(([_, v]) => v != null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}
