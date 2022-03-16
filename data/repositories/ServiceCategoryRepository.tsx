import request from 'utils/request'
import {ICity, ICountry} from 'data/intefaces/ILocation'
import {IServiceCategory} from 'data/intefaces/IServiceCategory'

export interface IDataQueryList{
  page?: number,
  limit?: number,
  search?: string,
  lang?: string
  categoryId?: number
  id?: number
}
export default class ServiceCategoryRepository {
  static async fetchCategories({page = 1, limit = 1000, search, id, categoryId, lang = 'en'}: IDataQueryList): Promise<IServiceCategory[] | null> {
    const res = await request({
      url: '/api/service-category',
      method: 'GET',
      data: {
        page,
        limit,
        ...(search ? {search} : {}),
        ...(lang ? {lang} : {}),
        ...(categoryId ? {categoryId} : {}),
      ...(id ? {id} : {}),
      }
    })
    console.log("Res111", res);
    if (res.err) {
      return null
    }
    return res.data
  }
}
