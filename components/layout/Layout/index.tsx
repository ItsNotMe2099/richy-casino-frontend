import Footer from '../Footer'
import Header from '../Header'
import styles from './index.module.scss'
import Menu from 'components/layout/Menu'
import {StickyContainer} from 'react-sticky'
import {useAppContext} from 'context/state'
import ErrorBoundary from 'components/ui/ErrorBoundary'

interface Props {
  children?: React.ReactNode
}

export default function Layout({children}: Props) {
  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      <ErrorBoundary>
      <Header/>
      </ErrorBoundary>
      <StickyContainer>
        <ErrorBoundary>
          <Menu/>
        </ErrorBoundary>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <ErrorBoundary>
          <Footer/>
        </ErrorBoundary>
      </StickyContainer>
    </div>
  )
}
