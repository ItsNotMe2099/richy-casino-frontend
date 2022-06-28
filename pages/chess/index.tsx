import {AudioPlayerProvider} from 'react-use-audio-player'
import WithGameFilterLayout from 'components/layout/WithGameFilterLayout'
import {GameSessionStrategy, IGameSession} from 'data/interfaces/IGameSession'

interface Props {
  session?: IGameSession
}

export default function ChessPage(props: Props) {

  return (<AudioPlayerProvider>
      <WithGameFilterLayout>
      
      </WithGameFilterLayout>
    </AudioPlayerProvider>
  )
}

export const getServerSideProps = async (context) => {


  return {
    props: {

  session: {strategy:GameSessionStrategy.Iframe, gameUrl: 'https://richy-games.dev.glob-com.ru/chess'}
    },
  }
}
