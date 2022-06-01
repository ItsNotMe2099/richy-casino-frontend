import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {


  const manifestUrl = `https://${req.headers.host}/manifest.json`
  // @ts-ignore
  res.status(200).json({
    name: 'Richy Casino',
    short_name: 'Richy Casino',
    start_url: `https://${req.headers.host}`,
    display: 'standalone',
    background_color: '#000000',
    'theme_color': '#FFFFFF',
    'orientation': 'any',
    description: 'Richy Casino',
    'icons': [        {
      'src': '/android-chrome-192x192.png',
      'sizes': '192x192',
      'type': 'image/png'
    },
      {
        'src': '/android-chrome-512x512.png',
        'sizes': '512x512',
        'type': 'image/png'
      }
    ],
      dir: 'ltr',
      scope: '/',
      intent_filters:{
      scope_url_scheme:'https',
      scope_url_host: req.headers.host,
      scope_url_path: '/'
    },
    display_mode:'standalone',
    web_manifest_url: manifestUrl,
    version_code: '1',
    version_name: '1.0',
    related_applications: [
      { 'platform': 'webapp', 'url':  manifestUrl }
    ]
  })
}
