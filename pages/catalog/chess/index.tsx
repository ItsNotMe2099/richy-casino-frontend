import { IGameSession } from 'data/interfaces/IGameSession'
import { runtimeConfig } from 'config/runtimeConfig'
interface Props {
  session?: IGameSession
}

export default function ChessPage(props: Props) {

  return null
}

export const getServerSideProps = async (context) => {
  return {
    props: {
    },
    redirect: {
      permanent: false,
      destination: `/game/${runtimeConfig.GAME_CHESS_ID}`,
    }

  }
}
