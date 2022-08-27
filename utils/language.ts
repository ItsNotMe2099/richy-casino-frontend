// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {NextRequest} from 'next/server'
const parser = require('accept-language-parser')
type Data = {
  name: string
}

export default function getLangFromRequest(
  req: NextRequest
) {
  return getLangFromHeader(req.headers.get('accept-language'))
}

export  function getLangFromHeader(
header: string
) {
  const languages = parser.parse(header)
  return languages.length > 0 ? languages[0].code : null
}
