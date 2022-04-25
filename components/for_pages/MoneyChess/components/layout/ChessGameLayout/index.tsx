import {ReactElement} from 'react'
import Layout from 'components/layout/Layout'
import Bets from 'components/for_pages/MoneyChess/for_pages/Chess/Bets'
import GamePageHeader from 'components/for_pages/games/components/layout/GamePageHeader'
import styles from './index.module.scss'
interface Props {
  children: ReactElement
}

export default function ChessGameLayout(props: Props) {

  return (
    <Layout>
      <div>
        <GamePageHeader title={'Chess'} icon={'/img/GameCard/chess-small.svg' }/>
        <div className={styles.root}>
        {props.children}
        </div>
        <Bets/>
      </div>
    </Layout>
  )
}
