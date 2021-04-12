import {IProfilePortfolio, IProfileTab, SkillData} from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
const queryString = require('query-string')
interface IProfileStatList{
  profileId: number,

}

export const fetchProfileStat = (profileId: number) => action(ActionTypes.FETCH_PROFILE_STAT_REQUEST, {
  api: {
    url: `/api/profile/stats/${profileId}`,
    method: 'GET',
  }
})
