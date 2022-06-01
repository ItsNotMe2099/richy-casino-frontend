import styles from './index.module.scss'
import {IGame} from 'data/interfaces/IGame'
import {IGameSession} from 'data/interfaces/IGameSession'
import IframeResizer from 'iframe-resizer-react'
interface Item extends IGame{
  link?: string
}
interface Props {
  session: IGameSession
}

export default function GameIframeRichy(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.board}>
          {props.session && <IframeResizer
            log
            className={styles.iframe}
            heightCalculationMethod="bodyScroll"
            src={props.session.gameUrl}
            style={{ width: '1px', minWidth: '100%'}}
          />}
          {!props.session && <div className={styles.error}>Игра временно не доступна</div>}
        </div>

    </div>
  )
}
