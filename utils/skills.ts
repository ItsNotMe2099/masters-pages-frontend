export const formatSkillList = (data) => {
  const categoryMap = {};
  for(const item of data){
    if(!categoryMap[item.categoryId]){
      categoryMap[item.categoryId] = {...item, skills: []}
    }
    categoryMap[item.categoryId].skills.push(item);
  }
  const list = []
  for (const [key, value] of Object.entries(categoryMap)) {
    list.push(value);
  }
  return list;
}
