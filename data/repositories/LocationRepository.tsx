import request from 'utils/request'

import {IPagination} from 'types/types'
import {ICity, ICountry, IPlaceResponse} from 'data/intefaces/ILocation'
export interface IDataQueryList{
  page?: number,
  limit?: number,
  search?: string,
  lang?: string
}

export interface IDataPlace{
  geonameid?: number
  zipcode?: string
  address: string
  office?: string
  isOnline?: boolean
}


export default class LocationRepository {
  static async fetchCountries({page = 1, limit = 1000, search, lang = 'en'}: IDataQueryList): Promise<ICountry[] | null> {
    console.log("fetchCountries111")
    const res = await request({
      url: '/api/location/country',
      method: 'GET',
      data: {
        search,
        page,
        limit,
        lang
      }
    })
    console.log("Res111", res);
    if (res.err) {
      return null
    }
    return res.data
  }
  static async fetchCities({id = null, page = 1, limit = 10, search, lang = 'en', countryCode}: IDataQueryList & {id?: number, countryCode?: string}): Promise<ICity[] | null> {
    const res = await request({
      url: '/api/location/city',
      method: 'GET',
      data: {
        ...(id ? {id} : {}),
        search,
        page,
        limit,
        lang,
        country: countryCode
      }
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async fetchLocations({id = null, page = 1, limit = 10, search, lang = 'en', countryCode}: IDataQueryList & {id?: number, countryCode?: string}): Promise<ICity[] | null> {
    const res = await request({
      url: '/api/location/city',
      method: 'GET',
      data: {
        ...(id ? {id} : {}),
        search,
        page,
        limit,
        lang,
        //country: countryCode
      }
    })
    if (res.err) {
      return null
    }
    return res.data
  }
  static async addPlaceToCurrentProfile({geonameid = null, zipcode = null, address = null, office = null, isOnline = false}: IDataPlace): Promise<IPlaceResponse | null> {
    const res = await request({
      url: '/api/place',
      method: 'POST',
      data: {
        geonameid,
        zipcode,
        address,
        office,
        isOnline
      }
    })
    console.log("Res111", res);
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchLocationCity({search, page, limit = 10, country}: IDataQueryList & {country: string}): Promise<ICity[]> {
    const res = await request({
      url: `/api/location/city?page=${page}&limit=${limit}&search=${search}&lang=en&country=${country}`,
      method: 'GET',
      data: {
      }
    })
    console.log("Res111", res);
    if (res.err) {
      return null
    }
    return res.data
  }

  static async fetchLocationCountry({search, page, limit = 10, country}: IDataQueryList & {country: string}): Promise<ICountry[]> {
    const res = await request({
      url: `/api/location/country?page=${page}&limit=${limit}&search=${search}&lang=en`,
      method: 'GET',
    })
    console.log("Res111", res);
    if (res.err) {
      return null
    }
    return res.data
  }
}
