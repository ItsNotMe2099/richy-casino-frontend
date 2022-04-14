import styles from 'components/for_pages/MoneyChess/components/layout/ChessGameLayout/index.module.scss'
import {ReactElement} from 'react'
import Layout from 'components/layout/Layout'
import PageTitle from 'components/for_pages/Common/PageTitle'
import Bets from 'components/for_pages/MoneyChess/for_pages/Chess/Bets'

interface Props {
  children: ReactElement
}

export default function ChessGameLayout(props: Props) {

  return (
    <Layout>
      <div className={styles.root}>
        <PageTitle icon='/img/GameCard/chess-small.svg' title='Chess' style='chess'/>
        {props.children}
        <Bets/>
      </div>
    </Layout>
  )
}
