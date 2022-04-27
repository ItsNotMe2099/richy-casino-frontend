import Button from 'components/ui/Button'
import ErrorPage from 'components/for_pages/error/ErrorPage'

export default function ErrorNotFound() {
  return <ErrorPage title={'Page not found'}>
    <Button size="large" background={'dark600'} href={'/'}>{'Home'}</Button>
  </ErrorPage>
}
