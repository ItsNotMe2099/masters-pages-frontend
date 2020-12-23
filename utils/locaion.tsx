export const inBounds = (point, bounds) => {
  if(!point){
    return false;
  }
  const inLat = point.lat > bounds.sw.lat && point.lat < bounds.ne.lat
  if (!inLat) return false

  const eastBound = point.lng < bounds.ne.lng
  const westBound = point.lng > bounds.sw.lng
  return (bounds.ne.lng < bounds.sw.lng)
    ? eastBound || westBound
    : eastBound && westBound
}
