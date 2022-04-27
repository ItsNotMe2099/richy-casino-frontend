import Button from 'components/ui/Button'
import ErrorPage from 'components/for_pages/error/ErrorPage'
export default function ErrorSystem() {
  return <ErrorPage title={'Error Happened'} >
    <Button size="large" background={'dark600'} href={'/'}>Home</Button>
  </ErrorPage>
}
