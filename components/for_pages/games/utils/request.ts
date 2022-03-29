import fetch from 'cross-fetch'
import Cookies from 'js-cookie'
import { CookiesType } from 'types/enums'
import {runtimeConfig} from 'config/runtimeConfig'

interface Options {
  url: string
  method?: 'post' | 'put' | 'get' | 'delete'
  data?: any
  token?: string // needed for requests from server side
}

interface Res {
  data: any | null
  err: string | string[] | null
}

async function request(options: string | Options): Promise<Res> {
  const optionsIsString = typeof options === 'string'
  const accessToken = (!optionsIsString && options.token) ? options.token : Cookies.get(CookiesType.accessToken)
  let url = ''
  let method = 'GET'
  let data = null

  if (optionsIsString) {
    url = options
  } else {
    url = options.url
    method = options.method ? options.method.toUpperCase() : 'GET'
    data = options.data
  }

  const correctUrl = `${runtimeConfig.GAMES_HOST}${url}${(method === 'GET' && data) ? `?${queryParams(data)}` : ''}`
  try {
    const res = await fetch(correctUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken ? `Bearer ${accessToken}` : '',
      },
      body: (method !== 'GET' && data) ? JSON.stringify(data) : null,
    })

    if (res.status === 401) {
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
    }
  } catch (err) {
    return {
      data: null,
      err: `${err}` ?? 'Error',
    }
  }
}

function queryParams(params: {[key: string]: any}) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')
}

export default request
