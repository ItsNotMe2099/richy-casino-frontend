// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from 'next'
const parser = require('accept-language-parser')
type Data = {
  name: string
}

export default function getLangFromRequest(
  req: NextApiRequest
) {
  const languages = parser.parse(req.headers['accept-language'])
  return languages.length > 0 ? languages[0].code : null
}
