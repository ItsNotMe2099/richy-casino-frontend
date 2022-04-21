import PageTitle from 'components/for_pages/Common/PageTitle'
import Layout from 'components/layout/Layout'
import Bets from 'components/for_pages/MoneyChess/for_pages/Chess/Bets'
import {GetServerSideProps} from 'next'
import styles from 'pages/faq/index.module.scss'
import ChessGameStats from 'components/for_pages/MoneyChess/for_pages/Stats'
import {getServerSideTranslation} from 'utils/i18'

export default function Chess() {

  return (
    <Layout>
      <div className={styles.root}>
        <PageTitle icon='/img/GameCard/chess-small.svg' title='Chess' style='chess'/>
        <ChessGameStats/>
        <Bets/>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context ) => {
  return {
    props: {
      ...await getServerSideTranslation(context),
    },
  }
}
