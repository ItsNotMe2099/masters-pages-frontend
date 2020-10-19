import authReducer from 'components/Auth/reducer';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  form: formReducer,
  authComponent: authReducer
})
