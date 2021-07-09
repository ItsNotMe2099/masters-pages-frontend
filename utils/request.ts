import { IRequestData, IResponse } from 'types'
import nextCookie from 'next-cookies'
import Cookies from 'js-cookie'
function request(requestData: IRequestData, ctx: any = null): Promise<IResponse> {
  const { url, method, data, host } = requestData
  const defaultHost = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}`
  let token = requestData.token
  let profileRole = requestData.profileRole;
  if (!token) {
    token = ctx ? nextCookie(ctx).token : Cookies.get('token')
  }
  if(!profileRole){
    profileRole = ctx ? nextCookie(ctx).mode : Cookies.get('mode')

  }
  return (
    fetch(`${host || defaultHost}${url}`, {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        'profile-role': profileRole
      },
      body: data ? JSON.stringify(data) : null,
    })
      .then(res => {
        const contentType = res.headers.get('content-type')
        const isJson = contentType && contentType.indexOf('application/json') !== -1

        if (res.status !== 200 && res.status !== 201) {
          console.log('Response status:', res.status)
          return (isJson ? res.json() : res.text()).then((resData: any) => {
            throw {status: res.status, data: resData}
          })
        }

        return isJson ? res.json() : res.text()
      })
      .then(res => {
        return {
          data: res,
          err: null,
        }
      })
      .catch(err => {
        return {
          data: null,
          status: err.status,
          err: err.data,
        }
      })
  )
}

export default request
