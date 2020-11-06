import { takeLatest, put, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import { createTaskComplete } from './actions'
import { IRequestData, IResponse, IRootState } from 'types'
function* CreateTaskCompleteSaga() {


  yield takeLatest(ActionTypes.CREATE_TASK,
    function* (action: ActionType<typeof createTaskComplete>) {
      const res: IResponse = yield requestGen({
        url: `/api/tasks`,
        method: 'POST',
        data: action.payload,
      } as IRequestData)
    })

}

export default CreateTaskCompleteSaga
