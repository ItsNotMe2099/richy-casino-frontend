import {runtimeConfig} from 'config/runtimeConfig'
import {NextApiRequest, NextApiResponse} from 'next'
const fs = require('fs')
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/txt')
  fs.createReadStream(`data/files/${runtimeConfig.ROBOTS_FILE}`).pipe(res)
}
