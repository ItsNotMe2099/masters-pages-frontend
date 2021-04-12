import {IProfilePortfolio, IProfileTab, SkillData} from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
interface IProfilePortfolioList{
  profileTabId?: number
  profileId: number,
  categoryId: number,
  subCategoryId: number,
  page: number,
  limit: 10,
}
export const resetProfilePortfolioForm = () => action(ActionTypes.RESET_PROFILE_PORTFOLIO_FORM)

export const createProfilePortfolio = (data: IProfilePortfolio, formKey: string) => action(ActionTypes.CREATE_PROFILE_PORTFOLIO, { data, formKey})
export const createProfilePortfolioRequest = (data: IProfilePortfolio) => action(ActionTypes.CREATE_PROFILE_PORTFOLIO_REQUEST, {
  api: {
    url: `/api/profile-portfolio`,
    method: 'POST',
    data: {...data},
  }
})

export const updateProfilePortfolio = (id: number, data: IProfilePortfolio, formKey: string) => action(ActionTypes.UPDATE_PROFILE_PORTFOLIO, { id, data, formKey})
export const updateProfilePortfolioRequest = (id: number, data: IProfilePortfolio) => action(ActionTypes.UPDATE_PROFILE_PORTFOLIO_REQUEST, {
  api: {
    url: `/api/profile-portfolio/${id}`,
    method: 'PUT',
    data: data,
  }
})
export const fetchProfilePortfolioList = (data: IProfilePortfolioList) => action(ActionTypes.FETCH_PROFILE_PORTFOLIO_LIST, {
  api: {
    url: `/api/profile-portfolio?${queryString.stringify(data)}`,
    method: 'GET',
  }
})

export const fetchProfilePortfolio = (id: number) => action(ActionTypes.FETCH_PROFILE_PORTFOLIO, {
  api: {
    url: `/api/profile-portfolio/${id}`,
    method: 'GET',
  }
})
export const deleteProfilePortfolio = (id: number) => action(ActionTypes.DELETE_PROFILE_PORTFOLIO, { id})
export const deleteProfilePortfolioRequest = (id: number) => action(ActionTypes.DELETE_PROFILE_PORTFOLIO_REQUEST, {
  api: {
    url: `/api/profile-portfolio/${id}`,
    method: 'DELETE'
  }
})

export const setProfilePortfolioTab = (tab: IProfileTab) => action(ActionTypes.SET_PROFILE_PORTFOLIO_TAB, { tab })

export const resetProfilePortfolioList = () => action(ActionTypes.RESET_PROFILE_PORTFOLIO_LIST)
export const setPageProfilePortfolio = (page: number) => action(ActionTypes.SET_PROFILE_PORTFOLIO_PAGE, page)
