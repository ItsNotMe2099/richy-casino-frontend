import Layout from 'components/layout/Layout'
import { Row, Col } from 'react-grid-system'
import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import styles from 'pages/faq/index.module.scss'
import SupportButton from 'components/for_pages/Common/SupportButton'
import HiddenXs from 'components/ui/HiddenXS'
import classNames from 'classnames'
import { useState } from 'react'
import VisibleXs from 'components/ui/VisibleXS'
import DropdownMenu from 'components/ui/DropdownMenu'


export default function Faq() {

  const options = [
    {label: 'Общие положения и условия', text: 'Посещая какой-либо из разделов Интернет-сайта Букмекерской компании «1Win» (далее – Интернет-сайт) или открывая игровой счет, пользователь соглашается со всеми пунктами Пользовательского соглашения (далее - Соглашение), Политикой конфиденциальности, условиями рекламной деятельности, правилами игр, бонусами и специальными предложениями, которые в настоящее время имеются на Интернет-сайте. Перед тем как принять условия Соглашения, необходимо внимательно ознакомиться со всеми его пунктами. Если Игрок (далее - Клиент) выражает свое несогласие с данным Соглашением, то ему необходимо покинуть или прекратить использование Интернет-сайта. Последующее использование Интернет-сайта будет расцениваться как принятие Клиентом всех нижеперечисленных пунктов данного Соглашения.'},
    {label: 'Пользовательское соглашение', text: ''},
    {label: 'Политика конфиденциальности', text: ''},
    {label: 'Ответственная игра', text: ''},
    {label: 'Условия возврата', text: ''},
    {label: 'Уведомления о рисках', text: ''},
  ]

  const [active, setActive] = useState(options[0].label)

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
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
    },
  }
}
