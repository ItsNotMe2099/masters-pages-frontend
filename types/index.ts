import {State as authState} from 'components/Auth/reducer'
import { AuthSignUpState } from "components/Auth/SignUp/reducer";
import { PWRecoveryState} from "components/Auth/PWRecovery/reducer"

export interface IRootState {
  authComponent: authState,
  authSignUp: AuthSignUpState
  PWRecovery: PWRecoveryState
}

export interface BaseAction {
  type: string
  payload: any
}

export interface IRequestData {
  url: string
  method?: 'POST' | 'PUT' | 'DELETE' | 'GET'
  data?: any
  token?: string
  host?: string
}

export interface IResponse {
  data: any
  err: any
}
