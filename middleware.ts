import {NextFetchEvent, NextRequest, NextResponse} from 'next/server'
import {CookiesType} from 'types/enums'
import getLangFromRequest from 'utils/language'

export  function middleware(req: NextRequest, ev: NextFetchEvent) {
  if(!req.nextUrl.pathname.includes('.') && !req.nextUrl.pathname.includes('_next')) {

    const url = req.nextUrl.clone()
    const acceptLang = req ? getLangFromRequest(req) : null
    url.locale = req.cookies.get(CookiesType.language) ?? acceptLang ?? url.locale ?? 'en'
    console.log('nextUrl', req.nextUrl.pathname,req.cookies.get(CookiesType.language), acceptLang, url.locale)
    return NextResponse.rewrite(url)
    console.log(req.nextUrl.locale) // undefined
  }
}
export const config = {
  matcher: '/:path*',
}
