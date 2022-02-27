import {IRequestData, IResponse} from 'types'
import fetch from 'cross-fetch'
import {parseCookies, setCookie, destroyCookie} from 'nookies'
import {CookiesType} from 'types/enums'

interface Options {
  url: string
  method?: 'POST' | 'PUT' | 'GET' | 'DELETE' | 'PATCH'
  data?: any
  token?: string // needed for requests from server side
  file?: File
  profileRole?: string
}

async function request(options: string | Options, ctx: any = null): Promise<IResponse> {
  const cookies = parseCookies(ctx)
  const optionsIsString = typeof options === 'string'
  const accessToken = (!optionsIsString && options.token) ? options.token : cookies[CookiesType.accessToken]
  const profileRole = (!optionsIsString && options.profileRole) ? options.profileRole : cookies[CookiesType.profileRole]
  let url = ''
  let method = 'GET'
  let data: any = null
  let file: File | null = null

  if (optionsIsString) {
    url = options
  } else {
    url = options.url
    method = options.method ? options.method.toUpperCase() : 'GET'
    data = options.data
    file = options.file ?? null
  }
  const correctUrl = `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_API_URL || ''}${url}${(method === 'GET' && data) ? `?${queryParams(data)}` : ''}`
  const mulipartFormData = typeof FormData == 'undefined' ? null : new FormData()
  if (file && mulipartFormData) {
    mulipartFormData.append('file', file)
  }

  const headers: HeadersInit = {
    'Authorization': accessToken ? `Bearer ${accessToken}` : '',
    'profile-role': profileRole || 'client'
  }


  if (!file) {
    headers['Content-Type'] = 'application/json'
  }
  try {
    const res = await fetch(correctUrl, {
      method,
      headers: headers,
      body: file ? mulipartFormData : (method !== 'GET' && data) ? JSON.stringify(data) : null,
    })

    if (res.status === 401 && !ctx) {
      destroyCookie(ctx, CookiesType.accessToken)
      window.location.replace('/')
      return {
        data: null,
        err: res.statusText ?? 'Unauthorized',
      }
    }

    const jsonData = await res.json()
    if (res.status === 200 || res.status === 201) {
      return {
        data: jsonData,
        err: null,
      }
    } else {
      return {
        data: null,
        err: jsonData.errors ?? 'Error',
      }
    }
  } catch (err) {
    return {
      data: null,
      err: `${err}` ?? 'Error',
    }
  }

}

function queryParams(params: { [key: string]: any }) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')
}

export default request
