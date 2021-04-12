export const changeArrayOrder =  (arr: any[],from: number, to: number) => {
  const newArr = [...arr];
   newArr.splice(to, 0, newArr.splice(from, 1)[0]);
   return newArr;
};
