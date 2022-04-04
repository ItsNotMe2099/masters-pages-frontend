import {IServiceCategory} from 'data/intefaces/IServiceCategory'

export interface ISkill  {
  id: number
  mainCategory: IServiceCategory,
  subCategory: IServiceCategory,
  category: IServiceCategory,
}
