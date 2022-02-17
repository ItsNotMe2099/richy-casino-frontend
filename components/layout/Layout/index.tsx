import { Container } from 'react-grid-system'
import Footer from '../Footer'
import Header from '../Header'
import styles from './index.module.scss'
import Menu from 'components/layout/Menu'
import {StickyContainer} from 'react-sticky'
import {useAppContext} from 'context/state'

interface Props{
  children?: React.ReactNode
}

export default function Layout({children}: Props){
  const appContext = useAppContext()
  const renderMainContent = () => {
    return <>
      <Menu/>

      {children}
      <Footer/>
      </>
  }
   return (
    <Container fluid style={{height: '100%', minHeight: '100%', maxWidth: '1320px'}}>
    <div className={styles.root}>
        <Header/>
      {appContext.isDesktop ? <StickyContainer>
        {renderMainContent()}
      </StickyContainer> : renderMainContent()}
    </div>
    </Container>
  )
}
