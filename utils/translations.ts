export function getCategoryTranslation(category, lang = 'ru') {
 const translation = category?.translations?.find(tr => tr.languageCode === lang) || category?.translations?.find(tr => tr.languageCode === 'en')
  if(!translation){
    return category?.translations[0]
  }
  return translation;
}
