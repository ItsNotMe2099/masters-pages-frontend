import {ITranslation} from 'data/intefaces/ITranslation'

interface IServiceCategoryTranslation extends ITranslation{
  name: string
  description: string
}
export interface IServiceCategory  {
  id: number
  name: string;
  description: string;
  iconUrl: string;
  color: string;
  isMain: boolean;
  isGeneral: boolean;
  translations: IServiceCategoryTranslation[];
}
