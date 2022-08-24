import Button from 'components/ui/Button'
import ErrorPage from 'components/for_pages/error/ErrorPage'
import * as Sentry from '@sentry/nextjs'
import NextErrorComponent from 'next/error'
export default function ErrorSystem() {
  return <ErrorPage title={'Error Happened'} >
    <Button size="large" background={'dark600'} href={'/'}>Home</Button>
  </ErrorPage>
}

ErrorSystem.getInitialProps = async contextData => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData)

  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData)
}
