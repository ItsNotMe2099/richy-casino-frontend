import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import ChessGameLobby from 'components/for_pages/MoneyChess/Lobby'
import {GameCookiesType} from 'components/for_pages/games/data/types'
import ChessGameLayout from 'components/for_pages/MoneyChess/components/layout/ChessGameLayout'
import nookies from 'nookies'
import GameAuthRepository from 'components/for_pages/games/data/reposittories/GameAuthRepository'
import {runtimeConfig} from 'config/runtimeConfig'
interface Props{
  token?: string
}
export default function Chess(props: Props) {

  return (
    <ChessGameLayout token={props.token}>
        <ChessGameLobby/>
    </ChessGameLayout>
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
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
      gameToken
    },
  }
}
