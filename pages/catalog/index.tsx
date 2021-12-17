import TopSlider from 'components/for_pages/CatalogPage/TopSlider'
import Filter from 'components/for_pages/Common/Filter'
import Layout from 'components/layout/Layout'
import styles from 'pages/index.module.scss'
import { Row, Col } from 'react-grid-system'

export default function CatalogPage() {

  const money = '25 572 257 ₽'

  return (
    <Layout>
      <Row>
      <Filter/>
      <Col className={styles.content}>
      <Row>
      <TopSlider money={money}/>
      </Row>
      </Col>
      </Row>
      <TopSlider money={money} slider/>
    </Layout>
  )
}