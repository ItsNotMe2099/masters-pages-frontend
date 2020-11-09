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
  estimate: number,
  address: string,
}
export const createTaskComplete = (data: CreateTaskData) => action(ActionTypes.CREATE_TASK, data)
export const createTaskeReset = () => action(ActionTypes.CREATE_TASK_RESET)
export const createTaskSuccess = () => action(ActionTypes.CREATE_TASK_SUCCESS)
export const createTaskError = (error) => action(ActionTypes.CREATE_TASK_ERROR, {error})
