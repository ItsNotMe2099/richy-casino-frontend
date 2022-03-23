import PageTitle from 'components/for_pages/Common/PageTitle'
import Layout from 'components/layout/Layout'
import Bets from 'components/MoneyChess/Bets'
import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import styles from 'pages/faq/index.module.scss'

export default function Chess() {

  return (
    <Layout>
      <div className={styles.root}>
        <PageTitle icon='/img/GameCard/chess-small.svg' title='Chess' style='chess'/>
        <Bets/>
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
