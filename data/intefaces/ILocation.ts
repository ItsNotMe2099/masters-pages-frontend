export interface ICountry{
  country_code: string
  country_name: string,
  name: string
  geonameid: number
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

export interface IPlaceResponse{
  id: number
  profileId: number
  country: string
  city: string
  region: null
  zipcode: string
  address: string
  office: string
  geonameid: number
  location: ILocation
  isExactLocation: boolean
  isOnline: boolean
  sort: null
  createdAt: string
  updatedAt: string
  geoname: IGeoname
  countryCode: string
}
