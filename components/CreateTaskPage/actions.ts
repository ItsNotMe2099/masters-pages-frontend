import ActionTypes from './const'
import { action } from 'typesafe-actions'
interface CreateTaskData{
  title: string,
  description: string,
  categoryId: number,
  subCategoryId: number,
  masterRole: string,
  geoNameId: number,
  ratePerHour: number,
  maxWeekHours: number,
  budget: number,
  estimate: number
}
export const createTaskComplete = (data: CreateTaskData) => action(ActionTypes.CREATE_TASK, data)
export const createTaskeReset = () => action(ActionTypes.CREATE_TASK_RESET)
