import PageTitle from 'components/for_pages/Common/PageTitle'
import Layout from 'components/layout/Layout'
import Bets from 'components/for_pages/MoneyChess/for_pages/Chess/Bets'
import {GetServerSideProps} from 'next'
import styles from 'pages/faq/index.module.scss'
import ChessGame from 'components/for_pages/MoneyChess/for_pages/Chess'
import nookies from 'nookies'
import {GameCookiesType} from 'components/for_pages/games/data/types'
import GameAuthRepository from 'components/for_pages/games/data/reposittories/GameAuthRepository'
import {runtimeConfig} from 'config/runtimeConfig'
import ChessGameRepository from 'components/for_pages/MoneyChess/data/repositories/ChessGameRepository'
import {ChessGameWrapper} from 'components/for_pages/MoneyChess/context/game_state'
import {IChessGame} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import GameUserRepository from 'components/for_pages/games/data/reposittories/GameUserRepository'
import {IGameUser} from 'components/for_pages/games/data/interfaces/IGameUser'
import {getServerSideTranslation} from 'utils/i18'
interface Props{
  gameToken?: string
  gameId: number
  initialGame?: IChessGame
  initialUser: IGameUser
}
export default function ChessGamePage(props: Props) {

  return (
    <Layout>
      <div className={styles.root}>
        <PageTitle icon='/img/GameCard/chess-small.svg' title='Chess' style='chess'/>
        <ChessGameWrapper gameId={props.initialGame?.id} initialUser={props.initialUser} initialGame={props.initialGame} token={props.gameToken}>
          <ChessGame/>
          <Bets/>
        </ChessGameWrapper>

      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context)
  let gameToken = cookies[GameCookiesType.accessToken]
  if(!gameToken){
    const authRes = await GameAuthRepository.loginGuest(runtimeConfig.GAMES_API_SECRET, 'btc')
    nookies.set(context, GameCookiesType.accessToken, authRes.accessToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    gameToken = authRes.accessToken
  }
  const initialGame = await ChessGameRepository.findById(parseInt(context.query.id as string, 10), gameToken)
  const initialUser = await GameUserRepository.getUser(gameToken)

  return {
    props: {
      ...await getServerSideTranslation(context),
      gameToken,
      initialGame,
      initialUser
    },
  }
}
