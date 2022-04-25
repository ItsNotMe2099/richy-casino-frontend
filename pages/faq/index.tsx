import Layout from 'components/layout/Layout'
import { Row, Col } from 'react-grid-system'
import {GetServerSideProps} from 'next'
import styles from 'pages/faq/index.module.scss'
import SupportButton from 'components/for_pages/Common/SupportButton'
import HiddenXs from 'components/ui/HiddenXS'
import classNames from 'classnames'
import { useState } from 'react'
import VisibleXs from 'components/ui/VisibleXS'
import DropdownMenu from 'components/ui/DropdownMenu'
import {IFaqItem} from 'data/interfaces/IFaqItem'
import FaqRepository from 'data/repositories/FaqRepository'
import {getServerSideTranslation} from 'utils/i18'

interface Props{
  faqItems: IFaqItem[]
}
export default function Faq(props: Props) {

  const options = props.faqItems.map(i => ({label: i.question, text: i.answer}))
  const [active, setActive] = useState(options.length > 0 ? options[0].label : null)

  const Contents = () => {
    return (
    <div className={styles.root}>
        <HiddenXs>
          <div className={styles.filter}>
            {options.map((item, index) =>
              <div key={index} className={classNames(styles.item, {[styles.active]: item.label === active})} onClick={() => setActive(item.label)}>
                {item.label}
              </div>
            )}
          </div>
        </HiddenXs>
        <VisibleXs>
          <DropdownMenu className={styles.drop} options={options} onChange={(item) => setActive(item.label)} activeTab={active}/>
        </VisibleXs>
      </div>
    )
  }

  return (
    <Layout>
      <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          F.A.Q.
        </div>
        <SupportButton className={styles.support}/>
      </div>
      <Row className={styles.row}>
        <Col className={styles.contents}>
          <Contents/>
        </Col>
        <Col>
          <div className={styles.content}>
            <div className={styles.label}>
              {active}
            </div>
            {options.map((item, index) =>
              item.label === active && <div className={styles.text}>{item.text}</div>
            )}
          </div>
        </Col>
      </Row>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context ) => {
  const faqItems = await FaqRepository.fetchList()
  return {
    props: {
      ...await getServerSideTranslation(context),
      faqItems
    },
  }
}
