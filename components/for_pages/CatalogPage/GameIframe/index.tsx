import styles from './index.module.scss'
import {IGame} from 'data/interfaces/IGame'
import {IGameSession} from 'data/interfaces/IGameSession'
import GameIFrameHeader from 'components/for_pages/CatalogPage/GameIframe/GameIFrameHeader'

interface Item extends IGame{
  link?: string
}
interface Props {
  session: IGameSession
}

export default function GameIframe(props: Props) {
  console.log('props.session.gameUrl', props.session?.gameUrl)
  return (
    <div className={styles.root}>
      <GameIFrameHeader icon={''} title={'Игра'}/>
      <div className={styles.board}>
        <div className={styles.iframeWrapper}>
          {props.session && <iframe
            className={styles.iframe}
            src={props.session.gameUrl}

          />}
          {!props.session && <div className={styles.error}>Игра временно не доступна</div>}
        </div>
      </div>

    </div>
  )
}
