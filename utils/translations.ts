export function getCategoryTranslation(category, lang = 'ru') {
  console.log("Category", category)
  const translation = category?.translations?.find(tr => tr.languageCode === lang) || category?.translations?.find(tr => tr.languageCode === 'en')
  if(!translation){
    return category.tranlations[0]
  }
  return translation;
}
