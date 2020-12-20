export const parserNumber = (val) => {
  return val ? parseInt(val, 10) : undefined
}

export const parserPrice = (value) => {
  if(!value){
    return null
  }
  const valueFormatted = value?.replace('$', '').replace(/\s/g, '');
  if(!valueFormatted){
    return null
  }
  return parseFloat(valueFormatted)
}
