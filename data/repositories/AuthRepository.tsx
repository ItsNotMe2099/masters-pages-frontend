import request from 'utils/request'
import {
  AuthLoginFormData,
  AuthConfirmFormData,
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

  static async register({data}: AuthRegisterFormData): Promise<IPhoneConfirmResponse | null> {
    const res = await request({
      url: '/api/auth/register',
      method: 'POST',
      data: {data},
    })
    console.log("Res111", res);
    if (res.err) {
      throw res.err;
    }
    return res.data
  }

  static async emailConfirmation({email, code}: AuthConfirmFormData): Promise<IAuthResponse | null> {
    const res = await request({
      url: '/api/auth/phoneConfirmation',
      method: 'POST',
      data: {email, code},
    })
    console.log("Res112", res);
    if (res.err) {
      throw res.err;
    }
    return res.data
  }

  static async phoneConfirmation({phone, code}: AuthConfirmFormData): Promise<IAuthResponse | null> {
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

  static async emailChangeConfirmation({email, code}: AuthConfirmFormData): Promise<IAuthResponse | null> {
    const res = await request({
      url: '/api/auth/phoneChangeConfirmation',
      method: 'POST',
      data: {email, code},
    })
    console.log("Res112", res);
    if (res.err) {
      throw res.err;
    }
    return res.data
  }

  static async phoneChangeConfirmation({phone, code}: AuthConfirmFormData): Promise<IAuthResponse | null> {
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

  static async passwordForgot({data}: AuthRegisterFormData): Promise<IPhoneConfirmResponse | null> {
    const res = await request({
      url: '/api/auth/forgot',
      method: 'POST',
      data: {data},
    })
    console.log("Res111", res);
    if (res.err) {
      throw res.err;
    }
    return res.data
  }

}
