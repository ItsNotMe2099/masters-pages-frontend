import {IProfileGalleryComment, IProfileGalleryItem, IProfileTab, SkillData} from "types";
import ActionTypes from './const'
import { action } from 'typesafe-actions'
import {format} from 'date-fns'
const queryString = require('query-string')
interface IReportFilterQuery{
  start: Date,
  end: Date
}

interface IReportQuery{
  start?: Date,
  end?: Date,
  ordersIds?: number[],
  mastersIds?: number[],
  clientsIds?: number[],
  fields?: string[]
}
export const fetchReportFilters = (data: IReportFilterQuery) => action(ActionTypes.FETCH_REPORT_FILTERS, {
  api: {
    url: `/api/reports/filters?${queryString.stringify({...data,
      start: format(data.start, 'yyyy-MM-dd 00:00:00 XXX'),
      end: format(data.end, 'yyyy-MM-dd 23:59:59 XXX')
    }, {arrayFormat: 'bracket'})}`,
    method: 'GET',
  }
})


export const fetchReportList = (data: IReportQuery) => action(ActionTypes.FETCH_REPORT, {
  api: {
    url: `/api/reports?${queryString.stringify({...data,
      start: format(data.start, 'yyyy-MM-dd 00:00:00 XXX'),
      end: format(data.end, 'yyyy-MM-dd 23:59:59 XXX'),

    }, {arrayFormat: 'bracket'})}`,
    method: 'GET',
  }
})

export const resetNewsList = () => action(ActionTypes.RESET_REPORT)
