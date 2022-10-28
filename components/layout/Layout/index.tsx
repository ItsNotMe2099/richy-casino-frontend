import Footer from '../Footer'
import Header from '../Header'
import styles from './index.module.scss'
import Menu from 'components/layout/Menu'
import {StickyContainer} from 'react-sticky'
import {useAppContext} from 'context/state'
import ErrorBoundary from 'components/ui/ErrorBoundary'

interface Props {
  children?: React.ReactNode
  hideMenu?: boolean
  fixedHeader?: boolean
}

export default function Layout(props: Props) {
  const appContext = useAppContext()

  const header = (<ErrorBoundary>
    <Header isSticky={props.fixedHeader}/>
  </ErrorBoundary>)
  return (
    <div className={styles.root}>
      {!props.fixedHeader && header}
      <StickyContainer>
        {props.fixedHeader && header}
        {!props.hideMenu && <ErrorBoundary>
          <Menu/>
        </ErrorBoundary>}
        <ErrorBoundary>
          {props.children}
        </ErrorBoundary>
        <ErrorBoundary>
          <Footer/>
        </ErrorBoundary>
      </StickyContainer>
    </div>
  )
}
