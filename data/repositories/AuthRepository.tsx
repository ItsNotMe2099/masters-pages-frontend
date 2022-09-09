import request from 'utils/request'
import {
  AuthLoginFormData,
  AuthPhoneConfirmFormData,
  AuthRegisterFormData,
  IAuthResponse, IPhoneConfirmResponse
} from 'data/intefaces/IAuth'


export default class AuthRepository {
  static async completeRegistration(data): Promise<boolean | null> {
    const res = await request({
      url: '/api/auth/completeRegistration',
      method: 'POST',
      data,
    })
    console.log("Res111", res);
    if (res.err) {
      throw res.err
    }
    return !!res.data
  }

  static async login(data: AuthLoginFormData): Promise<IAuthResponse | null> {
    const res = await request({
      url: '/api/auth/login',
      method: 'POST',
      data,
    })
    console.log("Res111245", res);
    if (res.err) {
      throw res.err
    }
    return res.data
  }

  static async register({phone}: AuthRegisterFormData): Promise<IPhoneConfirmResponse | null> {
    const res = await request({
      url: '/api/auth/register',
      method: 'POST',
      data: {phone},
    })
    console.log("Res111", res);
    if (res.err) {
      throw res.err;
    }
    return res.data
  }

  static async phoneConfirmation({phone, code}: AuthPhoneConfirmFormData): Promise<IAuthResponse | null> {
    const res = await request({
      url: '/api/auth/phoneConfirmation',
      method: 'POST',
      data: {phone, code},
    })
    console.log("Res112", res);
    if (res.err) {
      throw res.err;
    }
    return res.data
  }

  static async phoneChangeConfirmation({phone, code}: AuthPhoneConfirmFormData): Promise<IAuthResponse | null> {
    const res = await request({
      url: '/api/auth/phoneChangeConfirmation',
      method: 'POST',
      data: {phone, code},
    })
    console.log("Res112", res);
    if (res.err) {
      throw res.err;
    }
    return res.data
  }

  static async passwordForgot({phone}: AuthRegisterFormData): Promise<IPhoneConfirmResponse | null> {
    const res = await request({
      url: '/api/auth/forgot',
      method: 'POST',
      data: {phone},
    })
    console.log("Res111", res);
    if (res.err) {
      throw res.err;
    }
    return res.data
  }

}
