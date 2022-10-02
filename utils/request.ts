import { runtimeConfig } from 'config/runtimeConfig'
import Cookies from 'js-cookie'
import { CookiesType } from 'types/enums'
import {IApiResponse} from 'types/interfaces'
import Converter from 'utils/converter'
import axios, {AxiosRequestConfig, AxiosRequestHeaders} from 'axios'
import * as Sentry from '@sentry/nextjs'
interface Options {
  url: string
  method?: 'post' | 'put' | 'get' | 'delete'
  data?: any
  token?: string // needed for requests from server side
  sessionId?: string // needed for requests from server side
  language?: string // needed for requests from server side
  referer?: string
  file?: File
  disableCache?: boolean
  config?: AxiosRequestConfig
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
  let method = 'get'
  let data = null
  let referer = null
  let file: File | null = null
  let disableCache = false
  let config: AxiosRequestConfig = {}
  if (optionsIsString) {
    url = options
  } else {
    url = options.url
    method = options.method ? options.method.toLowerCase() : 'get'
    data = options.data
    file = options.file ?? null
    disableCache = options.disableCache ?? false
    referer = options.referer
    config = options.config as any
  }
  const ppDetailsCookie = Cookies.get(CookiesType.ppDetails)
  let ppDetails = null
  try {
     ppDetails = ppDetailsCookie ? JSON.parse(ppDetailsCookie) : null
  }catch (e) {
    console.error('ppDetailsErrors')
  }
  const correctUrl = `${runtimeConfig.HOST}${url}${(method === 'get' && data) ? `?${queryParams(data)}` : ''}`

  try {
    const mulipartFormData = typeof FormData == 'undefined' ? null : new FormData()
    if (file && mulipartFormData) {
      mulipartFormData.append('file', file)
    }
    const headers: HeadersInit = {
      'Authorization': accessToken ? `Bearer ${accessToken}` : '',
      'X-Language': language ?? '',
      'X-UUID': sessionId ?? '',
      ...(ppDetails ? ppDetails : {}),
      ...(referer ? {'Referer': referer} : {})
    }
    if (!file) {
      headers['Content-Type'] = 'application/json'
    }
    const res = await axios.request({
      url: correctUrl,
      method,
      headers: headers as AxiosRequestHeaders,
      data: file ? mulipartFormData : (method !== 'get' && data) ? JSON.stringify(data) : undefined,
      ...config,
      validateStatus: (status) => true
    })

    if (res.status === 401) {
      console.log('RequestUrl', url)
      console.log('RequestData', data)
      try {
        Sentry.captureException(new Error('401Error'))
      }catch (e) {
        
      }
      Cookies.remove(CookiesType.accessToken)
      setTimeout(() => {
        window.location.replace('/')
      }, 300)


      return {
        data: null,
        err: res.statusText ?? 'Unauthorized',
      }
    }
   const jsonData: IApiResponse = res.data
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
