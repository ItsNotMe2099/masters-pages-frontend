import request from 'utils/request'

import {IPagination} from 'types/types'
import {ICity, ICountry} from 'data/intefaces/ILocation'
export interface IDataQueryList{
  page?: number,
  limit?: number,
  search?: string,
  lang?: string
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
}
