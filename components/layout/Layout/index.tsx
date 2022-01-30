import { Container } from 'react-grid-system'
import Footer from '../Footer'
import Header from '../Header'
import styles from './index.module.scss'
import Menu from 'components/layout/Menu'

interface Props{
  children?: React.ReactNode
}

export default function Layout({children}: Props){

   return (
    <Container fluid style={{height: '100%', minHeight: '100%', maxWidth: '1320px'}}>
    <div className={styles.root}>

        <Header/>

      <Menu/>
        {children}
      <Footer/>
    </div>
    </Container>
  )
}
