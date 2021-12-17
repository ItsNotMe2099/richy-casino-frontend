import { Container } from 'react-grid-system'
import Footer from '../Footer'
import Header from '../Header'
import styles from './index.module.scss'

interface Props{
  children?: React.ReactNode
}

export default function Layout({children}: Props){

   return (
    <Container style={{height: '100%', minHeight: '100%'}}>
    <div className={styles.root}>
      <Header/>
        {children}
      <Footer/>
    </div>
    </Container>
  )
}
