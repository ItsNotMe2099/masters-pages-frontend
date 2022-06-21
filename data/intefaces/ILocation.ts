export interface ICountry{
  country_code: string
  country_name: string,
  name: string
}
export interface ICity{
  id: number
  name: string
}
export interface ILocation{
  lat: number
  lng: number
}
export interface IGeoname{
  id: number
  geonameid: number
  name: string
  asciiname: string
  alternatenames: string
  latitude: number
  longitude: number
  fclass: string
  fcode: string
  country: string
  cc2: string
  population: number
}
