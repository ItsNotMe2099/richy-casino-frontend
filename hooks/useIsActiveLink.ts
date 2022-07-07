import { useRouter } from 'next/router'

export default function useIsActiveLink(href: string): boolean {
  const { asPath } = useRouter()
  if (href === '/' && asPath === '/') {
    return true
  }else if(href === '/'){
    return false
  }
  const hrefKey = href.replace('/', '')
  return hrefKey ? asPath.replace('/', '').includes(hrefKey) : false
}
