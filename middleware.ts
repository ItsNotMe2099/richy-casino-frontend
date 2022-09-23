import {NextFetchEvent, NextRequest, NextResponse} from 'next/server'
import {CookiesType} from 'types/enums'
import getLangFromRequest from 'utils/language'
import {LANGS} from 'types/langs'

export  function middleware(req: NextRequest, ev: NextFetchEvent) {
  if( (!req.nextUrl.pathname.includes('.') && !req.nextUrl.pathname.includes('_next')) || (req.nextUrl.pathname.includes('_next/data'))) {

    const url = req.nextUrl.clone()
    const acceptLang = req ? getLangFromRequest(req) : null
    url.locale = LANGS.includes(req.cookies.get(CookiesType.language) ?? acceptLang ?? url.locale) ? req.cookies.get(CookiesType.language) ?? acceptLang ?? url.locale : 'en'
    return NextResponse.rewrite(url)
    console.log(req.nextUrl.locale) // undefined
  }
}
export const config = {
  matcher: '/:path*',
}
