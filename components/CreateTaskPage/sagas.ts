import { takeLatest, put, select } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import geocodeByAddress from "utils/geocodeByAddress";
import requestGen from "utils/requestGen";
import ActionTypes from './const'
import { createTaskComplete, createTaskError, createTaskSuccess } from './actions'
import { IRequestData, IResponse, IRootState } from 'types'
const  getCoordinationByAddress = async (address) => {
  if(!address){
    return;
  }
  try {
    const geocode = await geocodeByAddress(address);
    if (geocode && geocode.length > 0) {
      const location = geocode[0].geometry?.location
      return { lat: location.lat(), lng: location.lng() };
    }
  }catch (e) {
    return;
  }
}
function* CreateTaskCompleteSaga() {
  yield takeLatest(ActionTypes.CREATE_TASK,
    function* (action: ActionType<typeof createTaskComplete>) {
      const location = yield getCoordinationByAddress(action.payload.address);

      const res: IResponse = yield requestGen({
        url: `/api/tasks`,
        method: 'POST',
        data: {...action.payload, location},
      } as IRequestData)

      if(!res.err){
        yield put(createTaskSuccess(res.data));
      }else{
        yield put(createTaskError(res.err?.errors));
      }

    })


}

export default CreateTaskCompleteSaga
