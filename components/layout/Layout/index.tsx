import { Container } from 'react-grid-system'
import Footer from '../Footer'
import Header from '../Header'
import styles from './index.module.scss'
import { StickyContainer} from 'react-sticky'
import Menu from 'components/layout/Menu'

interface Props{
  children?: React.ReactNode
}

export default function Layout({children}: Props){

   return (
    <Container style={{height: '100%', minHeight: '100%'}}>
    <div className={styles.root}>

        <Header/>
      <StickyContainer>
      <Menu/>
        {children}
      <Footer/>
      </StickyContainer>
    </div>
    </Container>
  )
}
