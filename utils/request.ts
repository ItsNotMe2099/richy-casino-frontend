import fetch from 'cross-fetch'
import { runtimeConfig } from 'config/runtimeConfig'
import Cookies from 'js-cookie'
import { CookiesType } from 'types/enums'
import {IApiResponse} from 'types/interfaces'
import Converter from 'utils/converter'

interface Options {
  url: string
  method?: 'post' | 'put' | 'get' | 'delete'
  data?: any
  token?: string // needed for requests from server side
  sessionId?: string // needed for requests from server side
  language?: string // needed for requests from server side
  referer?: string
}

interface Res {
  data: any | null
  err: string | string[] | null
}

async function request(options: string | Options): Promise<Res> {
  const optionsIsString = typeof options === 'string'
  const accessToken = (!optionsIsString && options.token) ? options.token : Cookies.get(CookiesType.accessToken)
  const sessionId = (!optionsIsString && options.sessionId) ? options.sessionId : Cookies.get(CookiesType.sessionId)
  const language = (!optionsIsString && options.language) ? options.language : Cookies.get(CookiesType.language) || (typeof navigator !== 'undefined' ? (navigator as any)?.language || (navigator as any).userLanguage : '')
  let url = ''
  let method = 'GET'
  let data = null
  let referer = null
  if (optionsIsString) {
    url = options
  } else {
    url = options.url
    method = options.method ? options.method.toUpperCase() : 'GET'
    data = options.data
    referer = options.referer
  }
  const ppDetailsCookie = Cookies.get(CookiesType.ppDetails)
  let ppDetails = null
  try {
     ppDetails = ppDetailsCookie ? JSON.parse(ppDetailsCookie) : null
  }catch (e) {
    console.error('ppDetailsErrors')
  }
  const correctUrl = `${runtimeConfig.HOST}${url}${(method === 'GET' && data) ? `?${queryParams(data)}` : ''}`

  try {
    console.log('headers11',   {
      'Content-Type': 'application/json',
        'Authorization': accessToken ? `Bearer ${accessToken}` : '',
        'X-Language': language ?? '',
        'X-UUID': sessionId ?? '',
    ...(ppDetails ? ppDetails : {}),
    ...(referer ? {'Referer': referer} : {})
    })
    const res = await fetch(correctUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken ? `Bearer ${accessToken}` : '',
        'X-Language': language ?? '',
        'X-UUID': sessionId ?? '',
      ...(ppDetails ? ppDetails : {}),
      ...(referer ? {'Referer': referer} : {})
      },
      body: (method !== 'GET' && data) ? JSON.stringify(data) : null,
    })

    if (res.status === 401) {
      Cookies.remove(CookiesType.accessToken)
      window.location.replace('/')
      return {
        data: null,
        err: res.statusText ?? 'Unauthorized',
      }
    }
   const jsonData: IApiResponse = await res.json()
    if(!jsonData?.success){
      return {
        data: jsonData,
        err: Converter.convertApiResponseError(jsonData),
      }
    }
    if (res.status === 200 || res.status === 201) {

      return {
        data: jsonData,
        err: null,
      }
    }
  } catch (err) {
    console.error('Weweqe', err)
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
